<?php

namespace App\Form;

use App\Entity\SocialLinksPortfolio;
use App\Entity\UserPortfolio;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SocialLinksPortfolioForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('platform')
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
            'data_class' => SocialLinksPortfolio::class,
        ]);
    }
}
