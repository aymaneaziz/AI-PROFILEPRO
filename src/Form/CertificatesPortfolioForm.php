<?php

namespace App\Form;

use App\Entity\CertificatesPortfolio;
use App\Entity\UserPortfolio;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CertificatesPortfolioForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name')
            ->add('issuer')
            ->add('date')
            ->add('url')
            ->add('userPortfolio', EntityType::class, [
                'class' => UserPortfolio::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => CertificatesPortfolio::class,
        ]);
    }
}
