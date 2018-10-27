using Microsoft.AspNet.Identity;
using PersonalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PersonalProject.AdditionalClasses
{
    public static class ExtensionMethods
    {
         public static ApplicationUser GetLoggedInUserInDB(this System.Security.Principal.IPrincipal _User)
        {
            ApplicationDbContext db = new ApplicationDbContext();
         
            string userId = _User.Identity.GetUserId();
            var LoggedUser = db.Users.Find(userId);
            return LoggedUser;
           
        }

        public static void UpdateLevelPercentageAndReputation(this System.Security.Principal.IPrincipal _User, int _experience)
        {
            ApplicationDbContext db = new ApplicationDbContext();
            List<Level> levels = Static.MyLevels();
            //-------------------------------------//

            string userId = _User.Identity.GetUserId();
            var LoggedUser = db.Users.Find(userId);
            LoggedUser.Experience += _experience; // Update Experiance

            var userLevel = levels.FirstOrDefault(level => level.Max > LoggedUser.Experience);

            //LoggedUser.UserLevel = userLevel?.Index ?? 1; // Update Level
            LoggedUser.UserLevel = userLevel?.Index ?? 0; // Update Level

            if (userLevel == null)
            {
                LoggedUser.Reputation++; // Update Reputation
                LoggedUser.Experience = 0; // Update Experiance // tuke veke i level e nula...
            }

            var newPercentage = levels.First(n => n.Index == LoggedUser.UserLevel).MyMethod(LoggedUser.Experience);
            LoggedUser.CalculatedPercentage = newPercentage; // Update Calculated Percentage
            db.SaveChanges();

        }

    }
}