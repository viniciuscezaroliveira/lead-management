using Backend.Application.DTOs.Lead;
using Backend.Application.Interfaces;
using Backend.Application.Interfaces.Service;
using Backend.Domain.Entities;

namespace Backend.Application.Services.Lead
{
    public class UpdateLeadService : IUpdateLeadService
    {
        private readonly ILeadRepository _leadRepository;
        public UpdateLeadService(ILeadRepository leadRepository)
        {
            _leadRepository = leadRepository;
        }

        public async Task ExecuteAsync(int id, UpdateLeadRequestDTO dto)
        {
            try
            {
                var lead = await _leadRepository.GetLeadByIdAsync(id);
                if (lead == null)
                {
                    throw new Exception("Lead not found");
                }

                lead.ContactFirstName = dto.ContactFirstName;
                lead.ContactLastName = dto.ContactLastName;
                lead.ContactPhoneNumber = dto.ContactPhoneNumber;
                lead.ContactEmail = dto.ContactEmail;
                lead.Suburb = dto.Suburb;
                lead.Category = dto.Category;
                lead.Description = dto.Description;
                lead.Price = dto.Price;
                lead.DateUpdated = DateTime.Now;

                await _leadRepository.UpdateLeadAsync(lead);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}