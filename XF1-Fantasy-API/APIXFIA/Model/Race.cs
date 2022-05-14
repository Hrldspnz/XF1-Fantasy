namespace APIXFIA.Model
{
	/**
    * Clase para definir la carrera
    * @author Harold Espinoza
    */
	public class Race
    {
		public string ID_Race { get; set; }
		public string Race_name { get; set; }
		public string Race_track { get; set; }
		public string Country { get; set; }
		public string Date_begin { get; set; }
		public string Hour_begin { get; set; }
		public string Date_end { get; set; }
		public string Hour_end { get; set; }
		public string Race_state { get; set; }
		public string Tournament_id { get; set; }
	}
}
