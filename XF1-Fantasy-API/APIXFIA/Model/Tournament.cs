namespace APIXFIA.Model
{
	/**
    * Clase para definir el torneo
    * @author Harold Espinoza
    */
	public class Tournament
    {
		public string ID_tournament { get; set; }
		public string TName { get; set; }
		public string Date_begin { get; set; }
		public string Hour_begin { get; set; }
		public string Date_end { get; set; }
		public string Hour_end { get; set; }
		public string Rules_desc { get; set; }
		public int Budget { get; set; }

	}
}
