using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using PersonalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PersonalProject.Controllers
{
    public class RegisterPageController : ApiController
    {
       

        [Route("Personal_Project/Register/isUserNameAvailable")]
        [HttpPost]
        public bool isUserNameAvailable([FromBody] string _username)

        {
            //var x = _username;
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            if (UserManager.FindByName(_username) == null)
                {
                    //return "available";
                    return true;
            }
            //return "not available";
            return false;

        }


    }
}
