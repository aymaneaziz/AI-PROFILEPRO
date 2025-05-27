<?php

namespace App\Form;

use App\Entity\UserResume;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\ColorType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserResumeTypeForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                'label' => 'Titre du CV',
                'attr' => ['class' => 'form-control']
            ])
            ->add('resumeID', TextType::class, [
                'label' => 'ID du CV',
                'attr' => ['class' => 'form-control']
            ])
            ->add('userEmail', EmailType::class, [
                'label' => 'Email utilisateur',
                'attr' => ['class' => 'form-control']
            ])
            ->add('userName', TextType::class, [
                'label' => 'Nom d\'utilisateur',
                'attr' => ['class' => 'form-control']
            ])
            ->add('themeColor', ColorType::class, [
                'label' => 'Couleur du thème',
                'attr' => ['class' => 'form-control']
            ])
            ->add('firstName', TextType::class, [
                'label' => 'Prénom',
                'attr' => ['class' => 'form-control']
            ])
            ->add('lastName', TextType::class, [
                'label' => 'Nom',
                'attr' => ['class' => 'form-control']
            ])
            ->add('jobTitle', TextType::class, [
                'label' => 'Titre du poste',
                'attr' => ['class' => 'form-control']
            ])
            ->add('address', TextType::class, [
                'label' => 'Adresse',
                'attr' => ['class' => 'form-control']
            ])
            ->add('phone', TextType::class, [
                'label' => 'Téléphone',
                'attr' => ['class' => 'form-control']
            ])
            ->add('email', EmailType::class, [
                'label' => 'Email',
                'attr' => ['class' => 'form-control']
            ])
            ->add('summery', TextareaType::class, [
                'label' => 'Résumé',
                'attr' => ['class' => 'form-control', 'rows' => 5]
            ]);
            
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => UserResume::class,
        ]);
    }
}