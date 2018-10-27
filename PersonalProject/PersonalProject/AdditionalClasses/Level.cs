using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PersonalProject.AdditionalClasses
{
    public class Level
    {
        public int Index { get; set; }
        public int Min { get; set; }
        public int Max { get; set; }

        public int MyMethod(int _experiance)
        {

            double FirstPart = (_experiance - Min);
            double SecondPart = (Max - Min);

            double before = (FirstPart / (SecondPart / 100));
            int after = Convert.ToInt32(before);

            return after;
        }

        public Level(int index, int min, int max)
        {
            Index = index;
            Min = min;
            Max = max;
        }

    }
}