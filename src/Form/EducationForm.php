<?php

namespace App\Form;

use App\Entity\Education;
use App\Entity\UserResume;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EducationForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('universityName')
            ->add('degree')
            ->add('major')
            ->add('startDate')
            ->add('endDate')
            ->add('description')
            ->add('userResume', EntityType::class, [
                'class' => UserResume::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Education::class,
        ]);
    }
}
