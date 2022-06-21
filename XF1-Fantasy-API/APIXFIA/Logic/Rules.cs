using APIXFIA.Model;
using System.Collections.Generic;

namespace APIXFIA.Logic
{
    public class Rules
    {


        public List<ObjScore> TotScore(List<Driver> drivers, List<Car> cars, List<RaceResults> results)
        {
            List<ObjScore> objScores = new List<ObjScore>();
            for (int i = 0; i < drivers.Count; i++)
            {
                ObjScore objScore = new ObjScore();
                objScore.name = drivers[i].nameDriver;
                objScore.score += ptsXPosRace(results, objScore.name) + ptsXQali(results, objScore.name);
                objScores.Add(objScore);

            }
            /**for (int i = 0; i < cars.Count; i++)
            {
                ObjScore objScore = new ObjScore();
                objScore.name = cars[i].nameCar;
                objScore.score += ptsXPosRace(results, objScore.name);
                objScores.Add(objScore);

            }*/
            
            return objScores;
        }


        private int ptsXPosRace(List<RaceResults> results, string name)
        {
            int ptsXPos = 0;

            for (int i = 0; i < results.Count; i++)
            {
                if (name == results[i].Nombre && results[i].PosicionCarrera == 1)
                {
                    ptsXPos = 50;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 2)
                {
                    ptsXPos = 36;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 3)
                {
                    ptsXPos = 30;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 4)
                {
                    ptsXPos = 24;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 5)
                {
                    ptsXPos = 20;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 6)
                {
                    ptsXPos = 16;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 7)
                {
                    ptsXPos = 12;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 8)
                {
                    ptsXPos = 8;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 9)
                {
                    ptsXPos = 3;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 10)
                {
                    ptsXPos = 1;
                }
                if (name == results[i].Nombre && results[i].SinCalificarCarrera == "Y")
                {
                    ptsXPos -= 5;
                }
                if (name == results[i].Nombre && results[i].DescalificadodeCarrera == "Y")
                {
                    ptsXPos -= 40;
                }
                if (name == results[i].Nombre && results[i].CompanerodeEquipo == "Y")
                {
                    ptsXPos += 5;
                }
                if (name == results[i].Nombre && results[i].VueltaMasRapida == "Y")
                {
                    ptsXPos += 10;
                }

            }

            return ptsXPos;
        }

        private int ptsXQali(List<RaceResults> results, string name) 
        {
            int ptsXQali = 0;

            for (int i = 0; i < results.Count; i++)
            {
                if (name == results[i].Nombre && results[i].PosicionCarrera == 1)
                {
                    ptsXQali = 10;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 2)
                {
                    ptsXQali = 9;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 3)
                {
                    ptsXQali = 8;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 4)
                {
                    ptsXQali = 7;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 5)
                {
                    ptsXQali = 6;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 6)
                {
                    ptsXQali = 5;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 7)
                {
                    ptsXQali = 4;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 8)
                {
                    ptsXQali = 3;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 9)
                {
                    ptsXQali = 2;
                }
                if (name == results[i].Nombre && results[i].PosicionCarrera == 10)
                {
                    ptsXQali = 1;
                }
                if (name == results[i].Nombre && results[i].Q1 == "Y")
                {
                    ptsXQali += 1;
                }
                if (name == results[i].Nombre && results[i].Q2 == "Y")
                {
                    ptsXQali += 2;
                }
                if (name == results[i].Nombre && results[i].Q3 == "Y")
                {
                    ptsXQali += 3;
                }
                if (name == results[i].Nombre && results[i].SinCalificarCalificacion == "Y")
                {
                    ptsXQali -= 5;
                }
                if (name == results[i].Nombre && results[i].DescalificadoCalificacion == "Y")
                {
                    ptsXQali -= 10;
                }


            }

            return ptsXQali;
        }


        public int teamScore(List<ObjScore> scores, TeamsLeague teams) 
        {
            int teamScore = 0;
            for (int i = 0; i < scores.Count; i++) 
            {
                if (teams.nameDriver1 == scores[i].name)
                {
                    teamScore += scores[i].score ;
                }

                if (teams.nameDriver2 == scores[i].name)
                {
                    teamScore += scores[i].score;
                }

                if (teams.nameDriver3 == scores[i].name)
                {
                    teamScore += scores[i].score;
                }

                if (teams.nameDriver4 == scores[i].name)
                {
                    teamScore += scores[i].score;
                }

                if (teams.nameDriver5 == scores[i].name)
                {
                    teamScore += scores[i].score;
                }

                /**if (teams.car == scores[i].name)
                {
                    carBudget = validateTeamCarBudgetAUX(team.car, cars);
                }*/
            }
            

            return teamScore;
        }


    }
}
