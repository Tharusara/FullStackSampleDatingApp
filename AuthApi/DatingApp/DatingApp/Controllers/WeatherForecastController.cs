using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Data;
using DatingApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DatingApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ApplicationdbContext _context;
        public WeatherForecastController(ApplicationdbContext context)
        {
            _context = context;
        }

        // GET api/Weather
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Values>>> GetAll()
        {
            var valueslist = await _context.Values.ToListAsync();
            return valueslist;
        }

        // GET api/Weather/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Values>> Get(int id)
        {
            var Value = await _context.Values.FindAsync(id);

            if (Value == null)
            {
                return NotFound();
            }

            return Value;
        }

        // POST api/Weather
        [HttpPost]
        public async Task<ActionResult<Values>> Post([FromBody]Values values)
        {
            _context.Values.Add(values);
            await _context.SaveChangesAsync();

            return  values;
        }

        // PUT api/Weather/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Values values)
        {
            if (id != values.id)
            {
                return BadRequest();
            }

            _context.Entry(values).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ValueExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/Weather/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Values>> DeleteProduct(int id)
        {
            var value = await _context.Values.FindAsync(id);
            if (value == null)
            {
                return NotFound();
            }

            _context.Values.Remove(value);
            await _context.SaveChangesAsync();

            return value;
        }

        private bool ValueExists(int id)
        {
            return _context.Values.Any(e => e.id == id);
        }
    }
}
