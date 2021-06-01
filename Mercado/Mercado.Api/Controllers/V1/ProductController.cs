using System;
using System.IO;
using System.Threading.Tasks;
using Mercado.Api.Controllers.Base;
using Mercado.Application.Interface;
using Mercado.Application.ViewModels;
using Mercado.Domain.Core.Notifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Mercado.Api.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/product")]
    public class ProductController : BaseController
    {
        private readonly IProductServices _product;
        public ProductController(INotificationHandler notification,
                                 IProductServices product) : base(notification)
        {
            _product = product;
        }

        [HttpPost("add")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<ProductViewModel>> Add([FromForm] AddProductViewModel product)
        {
            if (!ModelState.IsValid) return Response(ModelState);

            var arrayImage = GetImageArray(product.Imagem);

            var model = new ProductViewModel
            {
                Name = product.Data.Name,
                Quantity = product.Data.Quantity,
                UnitaryValue = product.Data.UnitaryValue,
                ContentType = product.Imagem?.ContentType,
                Dados = arrayImage,
            };

            var result = await _product.Add(model);

            if (!result) return Response();

            return Response(result);
        }

        [HttpPut("update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<ProductViewModel>> Edit([FromForm] AddProductViewModel product)
        {
            if (!ModelState.IsValid) return Response(ModelState);

            var arrayImage = GetImageArray(product.Imagem);

            var model = new ProductViewModel
            {
                Id = product.Data.Id,
                Name = product.Data.Name,
                Quantity = product.Data.Quantity,
                UnitaryValue = product.Data.UnitaryValue,
                ContentType = product.Imagem?.ContentType,
                Dados = arrayImage,
            };

            var result = await _product.Update(model);

            if (!result) return Response();

            return Response(product);
        }

        [HttpGet("get-by-id/{productId:guid}")]
        public async Task<IActionResult> GetById(Guid productId)
        {
            var result = await _product.GetById(productId);
            return Response(result);
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _product.GetAll();
            return Response(result);
        }

        [HttpDelete("delete")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(Guid productId)
        {
            var result = await _product.Remove(productId);

            if (!result) return Response();

            return Response("Produto excluido com sucesso!");
        }

        private byte[] GetImageArray(IFormFile Imagem)
        {
            if(Imagem != null)
            {
                MemoryStream ms = new MemoryStream();
                Imagem?.OpenReadStream().CopyTo(ms);

                return ms.ToArray();
            }

            return null;
        }
    }
}