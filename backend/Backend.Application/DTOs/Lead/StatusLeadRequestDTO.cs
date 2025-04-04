using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs.Lead
{
    public class StatusLeadRequestDTO
    {
        [Required]
        public LeadStatusDTO Status { get; set; }
        public enum LeadStatusDTO
        {
            Invited = 0,
            Accepted = 1,
            Declined = 2
        }
    }
}