import { Component, OnInit, ViewChild } from '@angular/core';
import { RacesService } from 'src/app/services/races.service';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';


export class CSVRecord {  
  public id: any;  
  public firstName: any;  
  public lastName: any;  
  public age: any;  
  public position: any;  
  public mobile: any;     
} 

interface Positions {
  iD_Race:string,
  race_name: string;
  race_track: string;
  country:number;
  race_state:string;
  tournament_id:string;
}

@Component({
  selector: 'app-upload-race-results',
  templateUrl: './upload-race-results.component.html',
  styleUrls: ['./upload-race-results.component.css']
})
export class UploadRaceResultsComponent implements OnInit {

  // Atributes
  displayedColumns = ['race_name','race_track','country', 'race_state', 'select'];
  data: Positions[] = [];
  fileName = '';
  records:any[]=[]
  csvRecords: any;
  header: boolean = false;
  @ViewChild('fileImportInput') fileImportInput: any;
  resultJSON:any[]=[];

  constructor(private _racesService: RacesService,
              private ngxCsvParser: NgxCsvParser) { }

  ngOnInit(): void {
    this.getRaces();
  }

  getRaces(){
    this._racesService.getRaces().subscribe(
      result=>{
        this.data=result
      }
    )
  }


  onFileSelected($event:any, idRace:string) {
    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ';' })
      .pipe().subscribe({
        next: (result): void => {
          //console.log('Result', result);
          this.csvRecords = result;
          this.loadJSON(result, idRace)
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });
    }
  
  loadJSON(result:any,idRace:string){
    this.resultJSON=[]
    var counter=1;
    try {
      if(result[counter][14]!=undefined && result[counter][17]==undefined){
        var psCal:string;
        var psCaNum:number;
        var psCar:string;
        var psCarNum:number;
        while (result[counter]!=undefined) {
          psCal=result[counter][5];
          psCaNum=parseInt(psCal);
          psCar=result[counter][11];
          psCarNum=parseInt(psCar)

          if(psCal==="N/A")
            psCaNum=0
          if(psCar==="N/A")
            psCarNum=0
          this.resultJSON.push(
            {"CodigoXFIA":result[counter][0], 
            "Constructor":result[counter][1], 
            "Nombre":result[counter][2],
            "Tipo":result[counter][3],
            "Precio":parseInt(result[counter][4]),
            "PosicionCalificacion":psCaNum,
            "Q1":result[counter][6],
            "Q2":result[counter][7],
            "Q3":result[counter][8],
            "SinCalificarCalificacion":result[counter][9],
            "DescalificadoCalificacion":result[counter][10],
            "PosicionCarrera":psCarNum,
            "VueltaMasRapida":result[counter][12],
            "CompanerodeEquipo":result[counter][13],
            "SinCalificarCarrera":result[counter][14],
            "DescalificadodeCarrera":result[counter][15],
            "iD_Race": idRace
          })
          counter++;
      }
      // ---------------HACER POST AQUI-----------------------------
      this.sendResults();
      alert("Se subió correctamente los resultados")
      console.log(this.resultJSON)
      }
      else {
        alert("Hubo un error con el archivo subido\nVuelva a subir un archivo valido")
      }
    } catch (error) {
      alert("Hubo un error con el archivo subido\nVuelva a subir un archivo valido")
    } 
  }

  sendResults(){
    this._racesService.sendResults(this.resultJSON).subscribe(
      result=>{
        console.log(result)
      },
      error=>{
        alert("No se pudo subir resultados")
        console.log(error)
      }
    )
  }


}
