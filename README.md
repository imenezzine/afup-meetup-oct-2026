# Tester l'imprévisible : quand vos tests dépendent d'API tierces

Slides du talk présenté au meetup AFUP (octobre 2026), autour de la PR
[symfony/symfony#63781](https://github.com/symfony/symfony/pull/63781) qui ajoute `RecorderHttpClient` au composant HttpClient.

Talk réalisé par [Imen Ezzine](https://github.com/imenezzine).

## Lancer en local

```bash
yarn install
yarn serve   # http://localhost:8000 — touche « s » pour les notes orateur
```

## Build

```bash
yarn build
# ou, comme en CI :
dagger call build --public-path="/afup-meetup-oct-2026/" -o ./dist
```
