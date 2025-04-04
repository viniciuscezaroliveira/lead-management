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

        [HttpPost]
        [ProducesResponseType(typeof(CreateLeadResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ErrorDetails), StatusCodes.Status500InternalServerError)]


        public async Task<IActionResult> Create([FromBody] CreateLeadRequestDTO data)
        {
            try
            {
                var result = await _createLeadService.ExecuteAsync(data);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}