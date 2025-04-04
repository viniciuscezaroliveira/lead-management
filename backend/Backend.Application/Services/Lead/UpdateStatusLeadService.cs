using Backend.Application.DTOs.Lead;
using Backend.Application.Interfaces;
using Backend.Application.Interfaces.Gateways;
using Backend.Application.Interfaces.Service;
using Backend.Domain.Entities;
using static Backend.Application.DTOs.Lead.StatusLeadRequestDTO;

namespace Backend.Application.Services.Lead
{
    public class UpdateStatusLeadService : IUpdateStatusLeadService
    {
        private readonly ILeadRepository _leadRepository;
        private readonly IEmailGateway _emailGateway;
        public UpdateStatusLeadService(ILeadRepository leadRepository, IEmailGateway emailGateway)
        {
            _leadRepository = leadRepository;
            _emailGateway = emailGateway;
        }

        public async Task ExecuteAsync(int id, StatusLeadRequestDTO dto)
        {
            try
            {
                var leadData = await _leadRepository.GetLeadByIdAsync(id);
                if (leadData == null)
                {
                    throw new Exception("Lead not found");
                }

                leadData.Status = ConverterStatusDtoToModel(dto.Status);
                leadData.DateUpdated = DateTime.Now;
                leadData.HandleApplyDiscount();

                await _leadRepository.UpdateLeadAsync(leadData);
                if (leadData.Status == LeadStatus.Accepted)
                {
                    await _emailGateway.ExecuteAsync(leadData.ContactEmail, "Lead aceito", "Seu lead foi aceito");
                }
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
                LeadStatusDTO.Accepted => LeadStatus.Accepted,
                LeadStatusDTO.Declined => LeadStatus.Declined,
                _ => throw new Exception($"Valor inválido: {statusDto}")
            };
        }
    }
}