require = function() {
  imports = arguments;
  for (i = 0; i < imports.length; i++) {
    imported = document.createElement('script');
    imported.src = imports[i];
    document.head.appendChild(imported);
  }
}