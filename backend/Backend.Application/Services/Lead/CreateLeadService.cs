using Backend.Application.DTOs.Lead;
using Backend.Application.Interfaces;
using Backend.Application.Interfaces.Service;
using Backend.Domain.Entities;

namespace Backend.Application.Services.Lead
{
    public class CreateLeadService : ICreateLeadService
    {
        private readonly ILeadRepository _leadRepository;
        public CreateLeadService(ILeadRepository leadRepository)
        {
            _leadRepository = leadRepository;
        }

        public async Task<string> ExecuteAsync(CreateLeadRequestDTO dto)
        {
            var lead = new LeadEntity
            {
                ContactFirstName = dto.ContactFirstName,
                ContactLastName = dto.ContactLastName,
                ContactPhoneNumber = dto.ContactPhoneNumber,
                ContactEmail = dto.ContactEmail,
                Suburb = dto.Suburb,
                Category = dto.Category,
                Description = dto.Description,
                Price = dto.Price,
                Status = LeadStatus.Invited,
                DateCreated = DateTime.Now,
                DateUpdated = DateTime.Now
            };
            var response = await _leadRepository.AddLeadAsync(lead);
            return response.Id.ToString();
        }
    }
}