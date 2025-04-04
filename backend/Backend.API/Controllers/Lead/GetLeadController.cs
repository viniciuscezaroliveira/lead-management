using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Backend.API.Models.Error.Response;
using Backend.Application.DTOs.Lead;
using Backend.Application.Interfaces.Service;
using Backend.Application.Services.Lead;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers.Lead
{
    public partial class LeadController
    {

        [HttpGet]
        [ProducesResponseType(typeof(LeadResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]

        public async Task<IActionResult> GetAll([FromQuery] StatusLeadRequestDTO request)
        {
            try
            {
                if (request.Status == null)
                {
                    return StatusCode(400, "Status is required");
                }
                var result = await _getLeadService.ExecuteAsync(request.Status);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}