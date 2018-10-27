using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PersonalProject.Models
{
    public class PackManGame
    {
        [StringLength(128)]
        [MaxLength(128), ForeignKey("ApplicationUser")]
        public string id { get; set; }
        public int BestScore { get; set; }

        //public int MaxKills { get; set; }


        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}