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

        [HttpPut("{id}/status")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]


        public async Task<IActionResult> UpdateLeadStatus([FromRoute] int id, [FromBody] StatusLeadRequestDTO data)
        {
            try
            {
                await _updateStatusLeadService.ExecuteAsync(id, data);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ErrorDetails()
                {
                    Message = ex.Message,
                    StatusCode = 500
                });
            }
        }
    }
}