import "./styles.css";

import { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { ProductDTO } from "../../../models/product";
import { requestBackend } from "../../../utils/requests";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

type UrlParams = {
  productId: string;
};

export default function Form() {
  const { register, handleSubmit, reset, setValue } = useForm<ProductDTO>();

  const { productId } = useParams<UrlParams>();

  const isEditing = productId !== "create";

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}` }).then((response) => {
        const product = response.data as ProductDTO;

        setValue("name", product.name);
        setValue("price", product.price);
        setValue("description", product.description);
        setValue("imgUrl", product.imgUrl);
      });
    }
  }, [isEditing, productId, setValue]);

  const onSubmit = (formData: ProductDTO) => {
    const data = {
      ...formData,
      price: String(formData.price).replace(",", "."),
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? "PUT" : "POST",
      url: isEditing ? `/products/${productId}` : "/products",
      data,
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        reset();
        toast.info("Produto cadastrado com sucesso!");
      })
      .catch(() => {
        toast.error("Erro ao cadastrar produto!");
      });
  };

  return (
    <div className="form-container form-container-width">
      <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label id="name" className="form-label">
            Nome
          </label>
          <input
            {...register("name")}
            type="text"
            className="form-control"
            id="name"
            placeholder="Digite o nome"
          />
        </div>
        <div className="mb-3">
          <label id="price" className="form-label">
            Preço
          </label>
          <input
            {...register("price")}
            type="text"
            className="form-control"
            id="price"
            placeholder="Digite o preço"
          />
        </div>
        <div className="mb-3">
          <label id="description" className="form-label">
            Digite a descrição
          </label>
          <textarea
            {...register("description")}
            className="form-control"
            id="exampleFormControlTextarea1"
          ></textarea>
        </div>
        <div className="mb-3">
          <label id="imgUrl" className="form-label">
            Img URL
          </label>
          <input
            {...register("imgUrl")}
            type="text"
            className="form-control"
            id="imgUrl"
            placeholder="Digite a URL da imagem"
          />
        </div>
        <div className="col-auto">
        <button type="submit" className="btn btn-primary mb-3">
            SALVAR
          </button>
          <Link to="/admin/products">
            <button type="submit" className="btn btn-warning mb-3 ms-3">
              VOLTAR
            </button>
          </Link>
          
        </div>
      </form>
    </div>
  );
}
