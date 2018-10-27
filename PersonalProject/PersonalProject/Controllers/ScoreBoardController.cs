using PersonalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PersonalProject.Controllers
{
    public class ScoreBoardController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        [Authorize]
        [Route("Personal_Project/Main_Page_Personal_Project/ScoreBoardInfo")]
        public IEnumerable<ScoreUserModel> GetAll()
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {

                var listOfUsers = db.Users.Select(r => new ScoreUserModel
                {
                    Email = r.Email,
                    Name = r.UserName,
                    id = r.Id
                });
                return listOfUsers.ToList();
                
            }
        }
       
        [Route("Personal_Project/Main_Page_Personal_Project/ScoreBoardTable")]
        [Authorize]
        [HttpPost]
        public IEnumerable<ScoreBoardModel> ScoreBoardInfo([FromUri] int id, [FromBody] Object data)
        {
            dynamic d = data;
            string sort = d.sort;
            string search = d.search;

            var listOfUsers = db.Users.Select(r => new ScoreBoardModel
            {
                CarBestScore = r.CarGame.BestScore,
                Name = r.UserName,
                PacManBestScore = r.PackManGame.BestScore,
                Level = r.UserLevel,
                Reputation = r.Reputation
             });
           
            if (search.Length > 0)

            {
                return listOfUsers.Where(x => x.Name.Contains(search)).OrderBy(x => x.CarBestScore).Skip(id).Take(16);
                
            }

            if (sort == "pacman")
            {
                return listOfUsers.OrderByDescending(x => x.PacManBestScore).Skip(id).Take(16).ToList();
            }
            else if (sort == "car")
            {
                return listOfUsers.OrderByDescending(x => x.CarBestScore).Skip(id).Take(16).ToList();
            }
            else if (sort == "name")
            {
                return listOfUsers.OrderBy(x => x.Name).Skip(id).Take(16).ToList();
            }
            else
            {
                return listOfUsers.OrderByDescending(x => x.Reputation).Skip(id).Take(16).ToList();
            }
          
        }



    }
}
