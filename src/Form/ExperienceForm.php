<?php

namespace App\Form;

use App\Entity\Experience;
use App\Entity\UserResume;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ExperienceForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title')
            ->add('companyName')
            ->add('city')
            ->add('state')
            ->add('startDate')
            ->add('endDate')
            ->add('workSummery')
            ->add('userResume', EntityType::class, [
                'class' => UserResume::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Experience::class,
        ]);
    }
}
