using PersonalProject.AdditionalClasses;
using PersonalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace PersonalProject.Controllers
{
    public class MainPageController : ApiController
    {
        [Route("Personal_Project/Main_Page_Personal_Project/UserUnfo")]
        [ResponseType(typeof(string))] 
        //[HttpGet]
        [Authorize]
        public IHttpActionResult GetUserInfo()
        {
            var LoggedUser = User.GetLoggedInUserInDB();

            return Ok(new UserInfoModel
            {
                Name = LoggedUser.UserName,
                Reputation = LoggedUser.Reputation,
                UserLevel = LoggedUser.UserLevel,
                Experience = LoggedUser.Experience,
                CalculatedPercentage = LoggedUser.CalculatedPercentage,
                CarGameBestScore = LoggedUser.CarGame.BestScore,
                PackManGameBestScore = LoggedUser.PackManGame.BestScore,
                Avatar = LoggedUser.AvatarPicture
            });
        }

    }
}
