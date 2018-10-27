using Microsoft.AspNet.Identity;
using PersonalProject.AdditionalClasses;
using PersonalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PersonalProject.Controllers
{
    [RoutePrefix("Personal_Project/Main_Page_Personal_Project/Games/Cars")]
    public class CarGameController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

      

        [Route("EndGameUpdate")]
        [HttpPost]
        [Authorize]
        public Object UpdateLevel3([FromBody] int _experience)
        {
            User.UpdateLevelPercentageAndReputation(_experience);
            var x = User.GetLoggedInUserInDB();
            return new
            {
                perc = x.CalculatedPercentage,
                lvl = x.UserLevel,
                rep = x.Reputation

            };
           
        }

        [Route("CarGameEndGameUpdate")]
        [HttpPost] 
        [Authorize]
        public Object EndGameUpdateTwo([FromBody] Object data)
        {
            dynamic d = data;
            int _experiance = d.experiance;
            int _bestScore = d.bestscore;

          

            User.UpdateLevelPercentageAndReputation(_experiance);

            string userId = User.Identity.GetUserId();

            var newScore = _bestScore;

            var oldScore = db.Users.Find(userId).CarGame.BestScore;

            if (oldScore < newScore)
            {

                db.Users.Find(userId).CarGame.BestScore = _bestScore;
            }

            db.SaveChanges();

            var x = User.GetLoggedInUserInDB();

            return new
            {
                perc = x.CalculatedPercentage,
                lvl = x.UserLevel,
                rep = x.Reputation,
                bestscore = x.CarGame.BestScore

            };
            
        }


    }
}
