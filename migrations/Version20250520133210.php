<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250520133210 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE certificates_portfolio (id INT AUTO_INCREMENT NOT NULL, user_portfolio_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, issuer VARCHAR(255) DEFAULT NULL, date VARCHAR(255) DEFAULT NULL, url VARCHAR(255) DEFAULT NULL, INDEX IDX_6E15D11E39A72A41 (user_portfolio_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE education_portfolio (id INT AUTO_INCREMENT NOT NULL, user_portfolio_id INT DEFAULT NULL, degree VARCHAR(255) DEFAULT NULL, institution VARCHAR(255) DEFAULT NULL, start_date VARCHAR(255) DEFAULT NULL, end_date VARCHAR(255) DEFAULT NULL, current TINYINT(1) DEFAULT NULL, INDEX IDX_3D013F9839A72A41 (user_portfolio_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE experiences_portfolio (id INT AUTO_INCREMENT NOT NULL, user_portfolio_id INT DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, company VARCHAR(255) DEFAULT NULL, start_date VARCHAR(255) DEFAULT NULL, end_date VARCHAR(255) DEFAULT NULL, current TINYINT(1) DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, INDEX IDX_875613D339A72A41 (user_portfolio_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE projects_portfolio (id INT AUTO_INCREMENT NOT NULL, user_portfolio_id INT DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, technologies VARCHAR(255) DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, url VARCHAR(255) DEFAULT NULL, INDEX IDX_7051D75D39A72A41 (user_portfolio_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE skills_portfolio (id INT AUTO_INCREMENT NOT NULL, user_portfolio_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, level VARCHAR(255) DEFAULT NULL, INDEX IDX_7D7E701D39A72A41 (user_portfolio_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE social_links_portfolio (id INT AUTO_INCREMENT NOT NULL, user_portfolio_id INT DEFAULT NULL, platform VARCHAR(255) DEFAULT NULL, url VARCHAR(255) DEFAULT NULL, INDEX IDX_20503B1939A72A41 (user_portfolio_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE user_portfolio (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) DEFAULT NULL, user_email VARCHAR(255) DEFAULT NULL, user_name VARCHAR(255) DEFAULT NULL, portfolio_id VARCHAR(255) DEFAULT NULL, full_name VARCHAR(255) DEFAULT NULL, job_title VARCHAR(255) DEFAULT NULL, profile_picture VARCHAR(255) DEFAULT NULL, bio VARCHAR(255) DEFAULT NULL, theme_color VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE certificates_portfolio ADD CONSTRAINT FK_6E15D11E39A72A41 FOREIGN KEY (user_portfolio_id) REFERENCES user_portfolio (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE education_portfolio ADD CONSTRAINT FK_3D013F9839A72A41 FOREIGN KEY (user_portfolio_id) REFERENCES user_portfolio (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE experiences_portfolio ADD CONSTRAINT FK_875613D339A72A41 FOREIGN KEY (user_portfolio_id) REFERENCES user_portfolio (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE projects_portfolio ADD CONSTRAINT FK_7051D75D39A72A41 FOREIGN KEY (user_portfolio_id) REFERENCES user_portfolio (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE skills_portfolio ADD CONSTRAINT FK_7D7E701D39A72A41 FOREIGN KEY (user_portfolio_id) REFERENCES user_portfolio (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE social_links_portfolio ADD CONSTRAINT FK_20503B1939A72A41 FOREIGN KEY (user_portfolio_id) REFERENCES user_portfolio (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE certificates_portfolio DROP FOREIGN KEY FK_6E15D11E39A72A41
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE education_portfolio DROP FOREIGN KEY FK_3D013F9839A72A41
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE experiences_portfolio DROP FOREIGN KEY FK_875613D339A72A41
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE projects_portfolio DROP FOREIGN KEY FK_7051D75D39A72A41
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE skills_portfolio DROP FOREIGN KEY FK_7D7E701D39A72A41
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE social_links_portfolio DROP FOREIGN KEY FK_20503B1939A72A41
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE certificates_portfolio
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE education_portfolio
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE experiences_portfolio
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE projects_portfolio
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE skills_portfolio
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE social_links_portfolio
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE user_portfolio
        SQL);
    }
}
