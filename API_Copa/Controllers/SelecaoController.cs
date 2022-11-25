using System.Collections.Generic;
using System.Linq;
using api.Models;
using API_Copa.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/selecao")]
    public class SelecaoController : ControllerBase
    {
        private readonly Context _context;
        public SelecaoController(Context context) =>
            _context = context;

        [HttpPost]
        [Route("cadastrar")]
        public IActionResult Cadastrar([FromBody] Selecao selecao)
        {
            _context.Selecoes.Add(selecao);
            _context.SaveChanges();
            return Created("", selecao);
        }

        [HttpGet]
        [Route("listar")]
        public IActionResult Listar()
        {
            List<Selecao> Selecaos = _context.Selecoes.ToList();
            return Selecaos.Count != 0 ? Ok(Selecaos) : NotFound();
        }
    }
}