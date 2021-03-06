{extends file='frontend/checkout/cart_item_product.tpl'}

{* Tax price for normal products *}
{block name='frontend_checkout_cart_item_tax_price'}
    <div class="panel--td column--tax-price block is--align-right">
        {block name='frontend_checkout_cart_item_tax_label'}
            <div class="column--label tax-price--label">
                {if $sUserData.additional.charge_vat && !$sUserData.additional.show_net}
                    {s name='CheckoutColumnExcludeTax' namespace="frontend/checkout/confirm_header"}{/s}
                {elseif $sUserData.additional.charge_vat}
                    {s name='CheckoutColumnTax' namespace="frontend/checkout/confirm_header"}{/s}
                {/if}
            </div>
        {/block}

        {if $sUserData.additional.charge_vat}{$sBasketItem.tax|currency}{else}&nbsp;{/if}
    </div>
{/block}

{* Additional product relevant information *}
{block name='frontend_checkout_cart_item_details_essential_features'}
    {if {config name="alwaysShowMainFeatures"}}
        <div class="product--essential-features">
            {include file="string:{config name="mainfeatures"}"}
        </div>
    {/if}
{/block}

{* Hide tax symbols *}
{block name='frontend_checkout_cart_tax_symbol'}{/block}
