import Link from 'next/link'
import React from 'react'

const GamesButtons = () => {
    const games = [
        {
            title: "01. 4. Sınıf Matematik - 1. Ünite -  4-5-6 Basamaklı Sayılar - Test",
            path: "01. 4. Sınıf Matematik - 1. Ünite -  4-5-6 Basamaklı Sayılar - Test"
        },

        {
            title: '3. Sınıf Matematik 01 Üç basmaklı sayılar-ETKİNLİK',
            path: '3. Sınıf Matematik 01 Üç basmaklı sayılar-ETKİNLİK'
        },
        {
            title: '3. Sınıf Matematik 01 Üç basmaklı sayılar-TEST',
            path: '3. Sınıf Matematik 01 Üç basmaklı sayılar-TEST'
        },
        {
            title: '3. Sınıf Matematik 02 Ritmik Sayma Birer-Onar-Yüzer-ETKİNLİK',
            path: '3. Sınıf Matematik 02 Ritmik Sayma Birer-Onar-Yüzer-ETKİNLİK'
        },
        {
            title: '3. Sınıf Matematik 02 Ritmik Sayma Birer-Onar-Yüzer-TEST',
            path: '3. Sınıf Matematik 02 Ritmik Sayma Birer-Onar-Yüzer-TEST'
        },
        {
            title: '3. Sınıf Matematik 03 Basamak Adı - Etkinlik',
            path: '3. Sınıf Matematik 03 Basamak Adı - Etkinlik'
        },
        {
            title: '3. Sınıf Matematik 03 Basamak Adı - TEST',
            path: '3. Sınıf Matematik 03 Basamak Adı - TEST'
        },
        {
            title: '3. Sınıf Matematik 04 En Yakın Onluğa ve Yüzlüğe Yuvarlama - TEST',
            path: '3. Sınıf Matematik 04 En Yakın Onluğa ve Yüzlüğe Yuvarlama - TEST'
        },
        {
            title: '3. Sınıf Matematik 04 En Yakın Onluğa Yüzlüğe Yuvarlama - Etkinlik',
            path: '3. Sınıf Matematik 04 En Yakın Onluğa Yüzlüğe Yuvarlama - Etkinlik'
        },
        {
            title: '3. Sınıf Matematik 05 Sayıları Karşılaştırma - Etkinlik',
            path: '3. Sınıf Matematik 05 Sayıları Karşılaştırma - Etkinlik'
        },
        {
            title: '3. Sınıf Matematik 05 Sayıları Karşılaştırma - TEST',
            path: '3. Sınıf Matematik 05 Sayıları Karşılaştırma - TEST'
        },
        {
            title: '3. Sınıf Matematik 06  Ritmik Sayma Yüze Kadar - Etkinlik',
            path: '3. Sınıf Matematik 06  Ritmik Sayma Yüze Kadar - Etkinlik'
        },
        {
            title: '3. Sınıf Matematik 06 Ritmik Sayma Yüze Kadar - TEST',
            path: '3. Sınıf Matematik 06 Ritmik Sayma Yüze Kadar - TEST'
        },
        {
            title: '3. Sınıf Matematik 07 Sayı Örüntüsü - Etkinlik',
            path: '3. Sınıf Matematik 07 Sayı Örüntüsü - Etkinlik'
        },
        {
            title: '3. Sınıf Matematik 07 Sayı Örüntüsü - TEST',
            path: '3. Sınıf Matematik 07 Sayı Örüntüsü - TEST'
        },
        {
            title: '3. Sınıf Matematik 08 Tek Çift Sayılar - Etkinlik',
            path: '3. Sınıf Matematik 08 Tek Çift Sayılar - Etkinlik'
        },
        {
            title: '3. Sınıf Matematik 08 Tek Çift Sayılar - TEST',
            path: '3. Sınıf Matematik 08 Tek Çift Sayılar - TEST'
        },
        {
            title: '3. Sınıf Matematik 09 Tek Çift Sayıları Toplama - Etkinlik',
            path: '3. Sınıf Matematik 09 Tek Çift Sayıları Toplama - Etkinlik'
        },
        {
            title: '3. Sınıf Matematik 09 Tek Çift Sayıları Toplama - TEST',
            path: '3. Sınıf Matematik 09 Tek Çift Sayıları Toplama - TEST'
        },
        {
            title: '3. Sınıf Matematik 10 Roma Rakamaları - Etkinlik',
            path: '3. Sınıf Matematik 10 Roma Rakamaları - Etkinlik'
        },
        {
            title: '3. Sınıf Matematik 10 Roma Rakamları - TEST',
            path: '3. Sınıf Matematik 10 Roma Rakamları - TEST'
        },
        {
            title: '3. Sınıf Matematik 11 Toplama İşlemi - Etkinlik',
            path: '3. Sınıf Matematik 11 Toplama İşlemi - Etkinlik'
        },
        {
            title: '3. Sınıf Matematik 11 Toplama İşlemi - TEST',
            path: '3. Sınıf Matematik 11 Toplama İşlemi - TEST'
        },
        {
            title: '3. Sınıf Matematik 12 Toplananların Yer Değiştirmesi  - TEST',
            path: '3. Sınıf Matematik 12 Toplananların Yer Değiştirmesi  - TEST'
        },
        {
            title: '3. Sınıf Matematik 12 Toplananların Yer Değiştirmesi - Etkinlik',
            path: '3. Sınıf Matematik 12 Toplananların Yer Değiştirmesi - Etkinlik'
        },
        {
            title: '3. Sınıf Matematik 13 Çıkarma İşlemi - Etkinlik',
            path: '3. Sınıf Matematik 13 Çıkarma İşlemi - Etkinlik'
        },
        {
            title: '3. Sınıf Matematik 13 Çıkarma İşlemi - TEST',
            path: '3. Sınıf Matematik 13 Çıkarma İşlemi - TEST'
        },
        {
            title: '3. Sınıf Matematik 14 Zihinden Çıkarma - Etkinlik',
            path: '3. Sınıf Matematik 14 Zihinden Çıkarma - Etkinlik'
        },
        {
            title: '3. Sınıf Matematik 14 Zihinden Çıkarma - Test',
            path: '3. Sınıf Matematik 14 Zihinden Çıkarma - Test'
        }
    ]

    return (
        <div className="flex flex-wrap gap-4 p-14">
            {games.map((game) => (
                <Link href={`/games/${game.path}`} className='p-3 rounded bg-slate-800 text-white'>
                    {game.title}
                </Link>
            ))}
        </div>
    )
}

export default GamesButtons