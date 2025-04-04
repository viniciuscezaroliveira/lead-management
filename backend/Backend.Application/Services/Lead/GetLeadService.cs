using Backend.Application.DTOs.Lead;
using Backend.Application.Interfaces;
using Backend.Application.Interfaces.Service;
using Backend.Domain.Entities;
using static Backend.Application.DTOs.Lead.StatusLeadRequestDTO;

namespace Backend.Application.Services.Lead
{
    public class GetLeadService : IGetLeadService
    {
        private readonly ILeadRepository _leadRepository;
        public GetLeadService(ILeadRepository leadRepository)
        {
            _leadRepository = leadRepository;
        }

        public async Task<List<LeadResponseDto>> ExecuteAsync(LeadStatusDTO status)
        {
            try
            {
                if (status == null)
                {
                    throw new Exception("Status is required");
                }
                var lead = await _leadRepository.GetLeadsByStatusAsync(ConverterStatusDtoToModel(status));
                return lead.Select(l => new LeadResponseDto
                {
                    Id = l.Id.ToString(),
                    ContactFirstName = l.ContactFirstName,
                    ContactLastName = l.ContactLastName,
                    ContactPhoneNumber = l.ContactPhoneNumber,
                    ContactEmail = l.ContactEmail,
                    Suburb = l.Suburb,
                    Category = l.Category,
                    Description = l.Description,
                    Price = l.Price,
                    Status = (int)l.Status,
                    DateCreated = l.DateCreated ?? DateTime.MinValue,
                    DateUpdated = l.DateUpdated ?? DateTime.MinValue
                }).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private LeadStatus ConverterStatusDtoToModel(LeadStatusDTO statusDto)
        {
            return statusDto switch
            {
                LeadStatusDTO.Invited => LeadStatus.Invited,
                LeadStatusDTO.Accepted => LeadStatus.Accepted,
                LeadStatusDTO.Declined => LeadStatus.Declined,
                _ => throw new Exception($"Valor inválido: {statusDto}")
            };
        }
    }
}