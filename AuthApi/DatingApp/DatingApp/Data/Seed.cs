﻿using DatingApp.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace DatingApp.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/SeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                // create some custom roles
                var roles = new List<Role>
                {
                    new Role{Name="Member"},
                    new Role{Name="Admin"},
                    new Role{Name="Moderator"},
                    new Role{Name="VIP"}
                };
                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }
                foreach (var user in users)
                {
                    userManager.CreateAsync(user, "password").Wait();
                    userManager.AddToRoleAsync(user, "Member");
                }

                // create admin user
                var adminUser = new User
                {
                    UserName = "Admin"
                };
                var results = userManager.CreateAsync(adminUser, "password").Result;
                if (results.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Admin").Result;
                    userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
                }
            }

        }
        //private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        //{
        //    using (var hmac = new System.Security.Cryptography.HMACSHA512())
        //    {
        //        passwordSalt = hmac.Key;
        //        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        //    }
        //}
    }
}
