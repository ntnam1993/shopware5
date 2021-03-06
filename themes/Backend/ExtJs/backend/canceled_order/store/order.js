/**
 * Shopware 5
 * Copyright (c) shopware AG
 *
 * According to our dual licensing model, this program can be used either
 * under the terms of the GNU Affero General Public License, version 3,
 * or under a proprietary license.
 *
 * The texts of the GNU Affero General Public License with an additional
 * permission and of our proprietary license can be found at and
 * in the LICENSE file you have received along with this program.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * "Shopware" is a registered trademark of shopware AG.
 * The licensing of the program under the AGPLv3 does not imply a
 * trademark license. Therefore any rights, title and interest in
 * our trademarks remain entirely with us.
 *
 * @category   Shopware
 * @package    CanceledOrder
 * @subpackage Store
 * @version    $Id$
 * @author shopware AG
 */

/**
 * Shopware Store - Canceled Orders store
 * Shows canceled orders
 */
//{block name="backend/canceled_order/store/order"}
Ext.define('Shopware.apps.CanceledOrder.store.Order', {
    extend: 'Ext.data.Store',
    // Do not load data, when not explicitly requested
    autoLoad: false,
    model: 'Shopware.apps.CanceledOrder.model.Order',
    remoteFilter: true,
    remoteSort: true,
    /**
     * Configure the data communication
     * @object
     */
    proxy: {
        type: 'ajax',

        /**
         * Configure the url mapping
         * @object
         */
        api: {
            read: '{url controller=CanceledOrder action="getOrder"}',
            destroy: '{url controller=CanceledOrder action="deleteOrder" targetField=orders}'
        },

        /**
         * Configure the data reader
         * @object
         */
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});
//{/block}
