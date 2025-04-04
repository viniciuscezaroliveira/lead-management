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

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]


        public async Task<IActionResult> UpdateLead([FromRoute] int id, [FromBody] UpdateLeadRequestDTO data)
        {
            try
            {
                await _updateLeadService.ExecuteAsync(id, data);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}