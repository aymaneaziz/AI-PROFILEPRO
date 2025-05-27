<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250508145548 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE education (id INT AUTO_INCREMENT NOT NULL, user_resume_id INT DEFAULT NULL, university_name VARCHAR(255) DEFAULT NULL, degree VARCHAR(255) DEFAULT NULL, major VARCHAR(255) DEFAULT NULL, start_date VARCHAR(255) DEFAULT NULL, end_date VARCHAR(255) DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, INDEX IDX_DB0A5ED2D28222ED (user_resume_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE experience (id INT AUTO_INCREMENT NOT NULL, user_resume_id INT DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, company_name VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, state VARCHAR(255) DEFAULT NULL, start_date VARCHAR(255) DEFAULT NULL, end_date VARCHAR(255) DEFAULT NULL, work_summery VARCHAR(255) DEFAULT NULL, INDEX IDX_590C103D28222ED (user_resume_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE skills (id INT AUTO_INCREMENT NOT NULL, user_resume_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, rating INT DEFAULT NULL, INDEX IDX_D5311670D28222ED (user_resume_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE user_resume (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) DEFAULT NULL, resume_id VARCHAR(255) DEFAULT NULL, user_email VARCHAR(255) DEFAULT NULL, user_name VARCHAR(255) DEFAULT NULL, first_name VARCHAR(255) DEFAULT NULL, last_name VARCHAR(255) DEFAULT NULL, job_title VARCHAR(255) DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, phone VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, summery VARCHAR(255) DEFAULT NULL, theme_color VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', available_at DATETIME NOT NULL COMMENT '(DC2Type:datetime_immutable)', delivered_at DATETIME DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE education ADD CONSTRAINT FK_DB0A5ED2D28222ED FOREIGN KEY (user_resume_id) REFERENCES user_resume (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE experience ADD CONSTRAINT FK_590C103D28222ED FOREIGN KEY (user_resume_id) REFERENCES user_resume (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE skills ADD CONSTRAINT FK_D5311670D28222ED FOREIGN KEY (user_resume_id) REFERENCES user_resume (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE education DROP FOREIGN KEY FK_DB0A5ED2D28222ED
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE experience DROP FOREIGN KEY FK_590C103D28222ED
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE skills DROP FOREIGN KEY FK_D5311670D28222ED
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE education
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE experience
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE skills
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE user_resume
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE messenger_messages
        SQL);
    }
}
