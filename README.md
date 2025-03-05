# System Zarządzania Schroniskiem dla Zwierząt - Dokumentacja Backend

Ten repozytorium zawiera implementację backendu dla Systemu Zarządzania Schroniskiem dla Zwierząt zbudowanego przy użyciu Laravel 11.x. System umożliwia pracownikom schroniska zarządzanie zwierzętami, spotkaniami, kontami użytkowników oraz funkcjami administracyjnymi.

## Użyte Technologie

- **PHP Laravel 11.x** - Framework
- **JWT Authentication** - poprzez pakiet PHPOpenSourceSaver/JWTAuth
- **MySQL** - Baza danych

## Architektura Systemu

Backend wykorzystuje architekturę REST API z następującymi komponentami:

- **Kontrolery** - Obsługa punktów końcowych API i przetwarzanie żądań
- **Modele** - Definicje struktur danych i relacji
- **Migracje** - Definicje schematu bazy danych
- **Middleware** - Uwierzytelnianie i walidacja żądań
- **Klasy Resource** - Formatowanie odpowiedzi API

## Struktura Bazy Danych

System wykorzystuje następujące tabele i relacje:

- **Users** - Przechowuje informacje o kontach użytkowników
- **Roles** - Definiuje role użytkowników (administrator, zwykły użytkownik)
- **Role_User** - Tabela łącząca użytkowników i role
- **Pets** - Przechowuje informacje o zwierzętach w schronisku
- **Information** - Przechowuje dodatkowe informacje o użytkownikach (adres, telefon, itp.)
- **Invoices** - Śledzi spotkania między użytkownikami a zwierzętami

## Uwierzytelnianie

System wykorzystuje JWT (JSON Web Tokens) do bezstanowego uwierzytelniania:

1. Użytkownicy rejestrują się lub logują za pomocą email/hasła
2. Serwer weryfikuje dane uwierzytelniające i zwraca token JWT
3. Kolejne żądania zawierają token w nagłówku Authorization
4. Serwer weryfikuje token i identyfikuje użytkownika

### Trasy Uwierzytelniania

```
POST /api/register - Tworzenie nowego konta użytkownika
POST /api/login - Uwierzytelnianie i otrzymanie tokenu JWT
POST /api/logout - Unieważnienie bieżącego tokenu
GET /api/validate - Weryfikacja ważności tokenu
GET /api/admin - Sprawdzenie, czy użytkownik posiada uprawnienia administratora
```

## Middleware

System zawiera następujące middleware:

- **logged** - Weryfikuje token JWT i zapewnia uwierzytelnienie użytkownika
- **AdminAuthGuard** - Zapewnia, że użytkownik posiada uprawnienia administratora

## Endpointy API

### Zarządzanie Zwierzętami

```
GET /api/pets - Lista wszystkich zwierząt (paginacja)
GET /api/pets/{id} - Szczegóły konkretnego zwierzęcia
POST /api/pet/store - Dodanie nowego zwierzęcia
DELETE /api/pets/{id} - Usunięcie zwierzęcia
```

### Zarządzanie Użytkownikami

```
GET /api/me - Informacje o bieżącym użytkowniku
GET /api/users - Lista wszystkich użytkowników (tylko admin)
POST /api/grantAdmin - Nadanie uprawnień administratora
POST /api/removeAdmin - Usunięcie uprawnień administratora
POST /api/removeUser - Usunięcie konta użytkownika
```

### Informacje o Użytkowniku

```
GET /api/information/get - Pobranie informacji o bieżącym użytkowniku
POST /api/information/store - Dodanie informacji o użytkowniku
PUT /api/information/update - Aktualizacja informacji o użytkowniku
```

### Spotkania

```
GET /api/invoice/user - Pobranie spotkań użytkownika
POST /api/invoice/store - Utworzenie nowego spotkania
DELETE /api/invoice/destroy - Anulowanie spotkania
```

## Modele

System zawiera następujące modele z ich relacjami:

### User
- Posiada wiele ról (przez RoleUser)
- Posiada jedne Information
- Posiada wiele Invoices (spotkań)

```php
public function roles() {
    return $this->belongsToMany(Role::class);
}

public function information() {
    return $this->hasOne(Information::class);
}

public function invoices() {
    return $this->hasMany(Invoice::class);
}
```

### Pet
- Posiada jeden Invoice (spotkanie)

```php
public function invoice() {
    return $this->hasOne(Invoice::class);
}
```

### Invoice
- Należy do User
- Należy do Pet

```php
public function user() {
    return $this->belongsTo(User::class);
}

public function pet() {
    return $this->belongsTo(Pet::class);
}
```

## Formatowanie Odpowiedzi

System wykorzystuje klasy Laravel Resource do formatowania odpowiedzi API:

- **JsonResource** - Odpowiedzi dla pojedynczych rekordów
- **ResourceCollection** - Kolekcje rekordów z paginacją

To podejście zapewnia spójne formaty odpowiedzi i umożliwia selektywne eksponowanie atrybutów modeli.

## Funkcje Bezpieczeństwa

1. **Haszowanie Haseł** - Hasła użytkowników są haszowane przy użyciu fasady Hash w Laravel
2. **Ochrona Tokenem JWT** - Uwierzytelnianie za pomocą bezpiecznych tokenów
3. **Kontrola Dostępu Oparta na Rolach** - Administratorzy i zwykli użytkownicy mają różne uprawnienia
4. **Walidacja Żądań** - Dane wejściowe są walidowane przed przetworzeniem
5. **Chronione Trasy** - Kontrola dostępu poprzez middleware
6. **Ochrona Własnego Konta** - Użytkownicy nie mogą usunąć samych siebie ani odebrać sobie uprawnień administratora

## Instalacja

1. Sklonuj repozytorium
2. Zainstaluj zależności:
   ```
   composer install
   ```
3. Skopiuj `.env.example` do `.env` i skonfiguruj połączenie z bazą danych
4. Wygeneruj klucz aplikacji:
   ```
   php artisan key:generate
   ```
5. Uruchom migracje bazy danych:
   ```
   php artisan migrate
   ```
6. Wygeneruj sekret JWT:
   ```
   php artisan jwt:secret
   ```
7. Wypełnij bazę danych (tworzy użytkownika administratora i przykładowe dane):
   ```
   php artisan db:seed
   ```

## Domyślne Dane Logowania Administratora

Po wypełnieniu bazy danych możesz zalogować się za pomocą następujących danych:

- Email: test@example.com
- Hasło: password

## Notatki Deweloperskie

### Fabryki Danych

System zawiera fabryki do generowania danych testowych, szczególnie dla zwierząt:

```php
// Przykład PetFactory
public function definition(): array
{
    return [
        'name' => $this->faker->name(),
        'race' => $this->faker->randomElement(['Alaskan Malamute', 'Shih Tzu', 'Dalmatczyk', 'Chow Chow']),
        'gender' => $this->faker->randomElement(['MALE', 'FEMALE']),
        'age' => $this->faker->numberBetween(1, 10),
        'description' => $this->faker->randomElement(['OPIS', 'OPIS 1', 'OPIS 2']),
        'image' => $this->faker->randomElement($images)
    ];
}
```

### Obsługa Błędów

System zwraca standardowe odpowiedzi błędów z odpowiednimi kodami statusu HTTP:

- 200 - Sukces
- 401 - Nieautoryzowany (nieprawidłowy login/token)
- 403 - Zabroniony (niewystarczające uprawnienia)
- 404 - Zasób nie znaleziony
- 422 - Błąd walidacji

## Wdrożenie

Dla wdrożenia produkcyjnego:

1. Ustaw odpowiednie wartości w pliku `.env`:
   ```
   APP_ENV=production
   APP_DEBUG=false
   ```
2. Skonfiguruj serwer internetowy, aby wskazywał na katalog `public`
3. Upewnij się, że uprawnienia plików są poprawne
4. Skonfiguruj bezpieczne połączenie z bazą danych
5. Skonfiguruj czas wygaśnięcia tokenu JWT według potrzeb

## Licencja

[Licencja MIT](LICENSE.md)
