using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Threading.Tasks;

namespace Mercado.Application.ViewModels
{

    public class AddProductViewModel
    {
        [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
        public ProductViewModel Data { get; set; }

        public IFormFile Imagem { get; set; }
    }


    public class ProductViewModel
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O campo Nome precisa ser fornecido")]
        [DisplayName("Nome")]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo Quantidade precisa ser fornecido")]
        [DisplayName("Quantidade")]
        public int Quantity { get; set; }

        [Required(ErrorMessage = "O campo Valor Unitário precisa ser fornecido")]
        [DisplayName("Valor Unitário")]
        public decimal UnitaryValue { get; set; }
        public string ContentType { get; set; }
        public byte[] Dados { get; set; }

        public string ImageView
        {
            get
            {
                if(Dados != null && Dados.Length > 0)                
                    return Convert.ToBase64String(Dados);                

                return null;
            }
        }
    }

    public class FormDataJsonBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext == null)
            {
                throw new ArgumentNullException(nameof(bindingContext));
            }

            string fieldName = bindingContext.FieldName;
            var valueProviderResult = bindingContext.ValueProvider.GetValue(fieldName);

            if (valueProviderResult == ValueProviderResult.None)
            {
                return Task.CompletedTask;
            }
            else
            {
                bindingContext.ModelState.SetModelValue(fieldName, valueProviderResult);
            }

            string value = valueProviderResult.FirstValue;
            if (string.IsNullOrEmpty(value))
            {
                return Task.CompletedTask;
            }

            try
            {
                object result = JsonConvert.DeserializeObject(value, bindingContext.ModelType);
                bindingContext.Result = ModelBindingResult.Success(result);
            }
            catch (JsonException)
            {
                bindingContext.Result = ModelBindingResult.Failed();
            }

            return Task.CompletedTask;
        }
    }
}
