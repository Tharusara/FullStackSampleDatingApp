using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace DatingApp.Controllers
{
    public class FallbackController : ControllerBase
    {
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(),"wwwroot","index.html"),"text/HTML");
        }
    }
}