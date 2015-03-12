FROM iojs:onbuild

EXPOSE 8080

CMD ["iojs", "/src/index.js"]
