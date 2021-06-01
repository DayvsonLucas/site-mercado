import api from './baseUrl'

export const ListProduct = async () => {
  try {
    const response = await api.get(`v1/product/get-all`);
    return response.data

  } catch (err) {
    return err.response.data
  }
}

export const ListProductById = async (productId) => {
  try {
    const response = await api.get(`v1/product/get-by-id/${productId}`);
    return response.data

  } catch (err) {
    return err.response.data
  }
}

export const AddProduct = async (model, files) => {
  try {
    const data = new FormData();
    data.append('data', JSON.stringify(model));

    for (const key in files) {
      const value = files[key];
      if (Array.isArray(value)) {
        value.forEach(v => {
          data.append('imagem', v);
        });
      } else {
        data.append('imagem', value);
      }
    }
    const config = { headers: { 'content-type': 'multipart/form-data' } }
    const response = await api.post(`v1/product/add`, data, config);
    return response.data

  } catch (err) {
    return err.response.data
  }
}


export const UpdateProduct = async (model, files) => {
  try {
    const data = new FormData();
    data.append('data', JSON.stringify(model));

    for (const key in files) {
      const value = files[key];
      if (Array.isArray(value)) {
        value.forEach(v => {
          data.append('imagem', v);
        });
      } else {
        data.append('imagem', value);
      }
    }
    const config = { headers: { 'content-type': 'multipart/form-data' } }
    const response = await api.put(`v1/product/update`, data, config);
    return response.data

    // const response = await api.put(`v1/product/update`, model);
    // return response.data

  } catch (err) {
    return err.response.data
  }
}
export const RemoveProduct = async (productId) => {
  try {
    const response = await api.delete(`v1/product/delete?productId=${productId}`);
    return response.data

  } catch (err) {
    return err.response.data
  }
}
