using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PersonalProject.AdditionalClasses
{
    public static class Static
    {
        public static double Multiply(double x, double y)
        {
            double z = x + y;
            return z;
        }

        public static double myRandom(int x)
        {
            Random rnd = new Random();
            int a = rnd.Next(1, x);
            return a;
        }

        public static List<Level> MyLevels()
        {
            List<Level> levels = new List<Level>{
                    new Level(0, 0,  10),
                    new Level(1, 10, 30),
                    new Level(2, 30, 60),
                    new Level(3, 60, 90),
                };

            return levels;
        }



    }
}