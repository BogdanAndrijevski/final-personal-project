using PersonalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PersonalProject.Controllers
{
    public class TestController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        [Route("Personal_Project/Main_Page_Personal_Project/Games/Cars/Test")]
        [HttpGet]
        public int Test()
        {
            return 22;
        }

        [Route("Personal_Project/GetMySomeThing")]
        [HttpGet]
        public IEnumerable<UserModel> Get()
        {
            var listOfUsers = db.Users.Select(r => new UserModel
            {
                Email = r.Email,
                Name = r.UserName
               
            });

            return listOfUsers.ToList();
        }


    }
}
