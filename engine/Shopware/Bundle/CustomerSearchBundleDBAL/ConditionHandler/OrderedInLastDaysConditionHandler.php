<?php
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
 */

namespace Shopware\Bundle\CustomerSearchBundleDBAL\ConditionHandler;

use DateInterval;
use DateTime;
use Shopware\Bundle\CustomerSearchBundle\Condition\OrderedInLastDaysCondition;
use Shopware\Bundle\CustomerSearchBundleDBAL\ConditionHandlerInterface;
use Shopware\Bundle\SearchBundle\ConditionInterface;
use Shopware\Bundle\SearchBundleDBAL\QueryBuilder;

class OrderedInLastDaysConditionHandler implements ConditionHandlerInterface
{
    public function supports(ConditionInterface $condition)
    {
        return $condition instanceof OrderedInLastDaysCondition;
    }

    public function handle(ConditionInterface $condition, QueryBuilder $query)
    {
        $this->addCondition($condition, $query);
    }

    private function addCondition(OrderedInLastDaysCondition $condition, QueryBuilder $query): void
    {
        $query->andWhere('customer.last_order_time >= :OrderedInLastDaysCondition');
        $date = new DateTime();
        $date->sub(new DateInterval('P' . $condition->getLastDays() . 'D'));
        $query->setParameter(':OrderedInLastDaysCondition', $date->format('Y-m-d H:i:s'));
    }
}
