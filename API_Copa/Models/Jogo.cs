using System;

namespace API_Copa.Models
{
    public class Jogo
    {
        public Jogo()
        {
            SelecaoA = new Selecao();
            SelecaoB = new Selecao();
            CriadoEm = DateTime.Now;
        }
        public int Id { get; set; }
        public Selecao SelecaoA { get; set; }
        public Selecao SelecaoB { get; set; }
        public DateTime CriadoEm { get; set; }
    }
}
