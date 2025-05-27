<?php

namespace App\Form;

use App\Entity\UserPortfolio;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserPortfolioTypeForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title')
            ->add('userEmail')
            ->add('userName')
            ->add('portfolioID')
            ->add('fullName')
            ->add('jobTitle')
            ->add('profilePicture')
            ->add('bio')
            ->add('themeColor')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => UserPortfolio::class,
        ]);
    }
}
