using System;
using System.Collections.Generic;

namespace PersonalProject.Models
{
    // Models returned by AccountController actions.

    public class ExternalLoginViewModel
    {
        public string Name { get; set; }

        public string Url { get; set; }

        public string State { get; set; }
    }

    public class ManageInfoViewModel
    {
        public string LocalLoginProvider { get; set; }

        public string Email { get; set; }

        public IEnumerable<UserLoginInfoViewModel> Logins { get; set; }

        public IEnumerable<ExternalLoginViewModel> ExternalLoginProviders { get; set; }
    }

    public class UserInfoViewModel
    {
        public string Email { get; set; }

        public bool HasRegistered { get; set; }

        public string LoginProvider { get; set; }
    }

    public class UserLoginInfoViewModel
    {
        public string LoginProvider { get; set; }

        public string ProviderKey { get; set; }
    }

    public class ScoreUserModel
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string id { get; set; }
        
    }

    public class ScoreBoardModel
    {
        public string Name { get; set; }

        public int Level { get; set; }

        public int Reputation { get; set; }
        
        public int CarBestScore { get; set; }

        public int PacManBestScore { get; set; }

    }


    public class UserInfoModel
    {
        public string Name { get; set; }
        
        public int Experience { get; set; }

        public int UserLevel { get; set; }

        public int Reputation { get; set; }

        public int CalculatedPercentage { get; set; }

        public int CarGameBestScore { get; set; }

        public int PackManGameBestScore { get; set; }

        public string Avatar { get; set; }


    }

    public class UserModel
    {
        public string Name { get; set; }
        public string Email { get; set; }

        // Other properties here that do not reference another UserModel class.
    }

}
