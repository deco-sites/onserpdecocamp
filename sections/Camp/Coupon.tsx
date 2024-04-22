import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: string;
  code: string;
  description?: HTMLWidget;
  discount: number;
  discountType: "percentual" | "fixo";
  freeShipping?: boolean;
  /**
   * @title Validade do cupom
   * @format datetime
   */
  validUntil?: string;
}

const DEFAULTS = {
  title: "Coupon",
  code: "COUPON",
  discount: 10,
  discountType: "percentual" as Props["discountType"],
  freeShipping: false,
};

export default function Coupon({
  title = DEFAULTS.title,
  code = DEFAULTS.code,
  description,
  discount = DEFAULTS.discount,
  discountType = DEFAULTS.discountType,
  freeShipping = DEFAULTS.freeShipping,
  validUntil,
}: Props) {
  const discountMessage = discountType === "percentual"
    ? `${discount}%`
    : `R$ ${discount}`;

  return (
    <div class="bg-gray-100 p-8 mt-8">
      <div class="container">
        <h2 class="text-lg font-semibold mb-4">
          {title}
        </h2>
        <p class="mb-2">
          Use o código <span class="font-semibold text-green-600">{code}</span>
          {" "}
          e ganhe:
        </p>
        <ul class="list-disc pl-6 mb-4">
          <li>{discountMessage} de desconto em sua compra</li>
          {freeShipping && <li>Frete grátis para todo o Brasil</li>}
        </ul>
        <p class="text-sm text-gray-600">
          Válido {validUntil
            ? `até ${
              new Date(validUntil).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            }`
            : "por tempo limitado"}. Aproveite!
        </p>

        {description && (
          <div class="prose mb-8">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
