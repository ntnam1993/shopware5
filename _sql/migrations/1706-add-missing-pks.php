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
class Migrations_Migration1706 extends Shopware\Components\Migrations\AbstractMigration
{
    public function up($modus)
    {
        try {
            $this->connection->exec('ALTER TABLE `s_articles_avoid_customergroups`
        ADD PRIMARY KEY `articleID_customergroupID` (`articleID`, `customergroupID`);');
        } catch (PDOException $e) {
            // PK Exists
        }

        try {
            $this->connection->exec('ALTER TABLE `s_categories_avoid_customergroups`
        ADD PRIMARY KEY `categoryID_customergroupID` (`categoryID`, `customergroupID`);');
        } catch (PDOException $e) {
            // PK Exists
        }

        try {
            $this->connection->exec('ALTER TABLE `s_customer_streams_mapping`
        ADD PRIMARY KEY `stream_id_customer_id` (`stream_id`, `customer_id`);');
        } catch (PDOException $e) {
            // PK Exists
        }
    }
}
