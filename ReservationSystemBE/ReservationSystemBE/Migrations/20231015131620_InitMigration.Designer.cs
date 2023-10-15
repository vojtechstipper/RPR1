﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ReservationSystemBE.Infrastructure.Persistence;

#nullable disable

namespace ReservationSystemBE.Migrations
{
    [DbContext(typeof(ReservationSystemDbContext))]
    [Migration("20231015131620_InitMigration")]
    partial class InitMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("AllergenProduct", b =>
                {
                    b.Property<string>("AllergensId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProductsId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("AllergensId", "ProductsId");

                    b.HasIndex("ProductsId");

                    b.ToTable("AllergenProduct");
                });

            modelBuilder.Entity("ReservationSystem.Domain.Allergens.Allergen", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("Code")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Allergens");
                });

            modelBuilder.Entity("ReservationSystem.Domain.Products.PriceLevel", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("ProductId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("PriceLevels");
                });

            modelBuilder.Entity("ReservationSystem.Domain.Products.Product", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ProductTypeId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("ProductTypeId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("ReservationSystem.Domain.Products.ProductType", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("ProductTypes");
                });

            modelBuilder.Entity("AllergenProduct", b =>
                {
                    b.HasOne("ReservationSystem.Domain.Allergens.Allergen", null)
                        .WithMany()
                        .HasForeignKey("AllergensId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ReservationSystem.Domain.Products.Product", null)
                        .WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ReservationSystem.Domain.Products.PriceLevel", b =>
                {
                    b.HasOne("ReservationSystem.Domain.Products.Product", null)
                        .WithMany("PriceLevels")
                        .HasForeignKey("ProductId");
                });

            modelBuilder.Entity("ReservationSystem.Domain.Products.Product", b =>
                {
                    b.HasOne("ReservationSystem.Domain.Products.ProductType", "ProductType")
                        .WithMany("Products")
                        .HasForeignKey("ProductTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ProductType");
                });

            modelBuilder.Entity("ReservationSystem.Domain.Products.Product", b =>
                {
                    b.Navigation("PriceLevels");
                });

            modelBuilder.Entity("ReservationSystem.Domain.Products.ProductType", b =>
                {
                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}