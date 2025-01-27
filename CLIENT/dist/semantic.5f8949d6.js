// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"semantic/dist/semantic.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
* # Semantic UI - 2.4.2
* https://github.com/Semantic-Org/Semantic-UI
* http://www.semantic-ui.com/
*
* Copyright 2014 Contributors
* Released under the MIT license
* http://opensource.org/licenses/MIT
*
*/

/*!
 * # Semantic UI 2.4.2 - Site
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
;

(function ($, window, document, undefined) {
  $.site = $.fn.site = function (parameters) {
    var time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        _settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.site.settings, parameters) : $.extend({}, $.site.settings),
        namespace = _settings.namespace,
        error = _settings.error,
        eventNamespace = '.' + namespace,
        moduleNamespace = 'module-' + namespace,
        $document = $(document),
        $module = $document,
        element = this,
        instance = $module.data(moduleNamespace),
        module,
        returnedValue;

    module = {
      initialize: function initialize() {
        module.instantiate();
      },
      instantiate: function instantiate() {
        module.verbose('Storing instance of site', module);
        instance = module;
        $module.data(moduleNamespace, module);
      },
      normalize: function normalize() {
        module.fix.console();
        module.fix.requestAnimationFrame();
      },
      fix: {
        console: function (_console) {
          function console() {
            return _console.apply(this, arguments);
          }

          console.toString = function () {
            return _console.toString();
          };

          return console;
        }(function () {
          module.debug('Normalizing window.console');

          if (console === undefined || console.log === undefined) {
            module.verbose('Console not available, normalizing events');
            module.disable.console();
          }

          if (typeof console.group == 'undefined' || typeof console.groupEnd == 'undefined' || typeof console.groupCollapsed == 'undefined') {
            module.verbose('Console group not available, normalizing events');

            window.console.group = function () {};

            window.console.groupEnd = function () {};

            window.console.groupCollapsed = function () {};
          }

          if (typeof console.markTimeline == 'undefined') {
            module.verbose('Mark timeline not available, normalizing events');

            window.console.markTimeline = function () {};
          }
        }),
        consoleClear: function consoleClear() {
          module.debug('Disabling programmatic console clearing');

          window.console.clear = function () {};
        },
        requestAnimationFrame: function requestAnimationFrame() {
          module.debug('Normalizing requestAnimationFrame');

          if (window.requestAnimationFrame === undefined) {
            module.debug('RequestAnimationFrame not available, normalizing event');

            window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
              setTimeout(callback, 0);
            };
          }
        }
      },
      moduleExists: function moduleExists(name) {
        return $.fn[name] !== undefined && $.fn[name].settings !== undefined;
      },
      enabled: {
        modules: function modules(_modules) {
          var enabledModules = [];
          _modules = _modules || _settings.modules;
          $.each(_modules, function (index, name) {
            if (module.moduleExists(name)) {
              enabledModules.push(name);
            }
          });
          return enabledModules;
        }
      },
      disabled: {
        modules: function modules(_modules2) {
          var disabledModules = [];
          _modules2 = _modules2 || _settings.modules;
          $.each(_modules2, function (index, name) {
            if (!module.moduleExists(name)) {
              disabledModules.push(name);
            }
          });
          return disabledModules;
        }
      },
      change: {
        setting: function setting(_setting, value, modules, modifyExisting) {
          modules = typeof modules === 'string' ? modules === 'all' ? _settings.modules : [modules] : modules || _settings.modules;
          modifyExisting = modifyExisting !== undefined ? modifyExisting : true;
          $.each(modules, function (index, name) {
            var namespace = module.moduleExists(name) ? $.fn[name].settings.namespace || false : true,
                $existingModules;

            if (module.moduleExists(name)) {
              module.verbose('Changing default setting', _setting, value, name);
              $.fn[name].settings[_setting] = value;

              if (modifyExisting && namespace) {
                $existingModules = $(':data(module-' + namespace + ')');

                if ($existingModules.length > 0) {
                  module.verbose('Modifying existing settings', $existingModules);
                  $existingModules[name]('setting', _setting, value);
                }
              }
            }
          });
        },
        settings: function settings(newSettings, modules, modifyExisting) {
          modules = typeof modules === 'string' ? [modules] : modules || _settings.modules;
          modifyExisting = modifyExisting !== undefined ? modifyExisting : true;
          $.each(modules, function (index, name) {
            var $existingModules;

            if (module.moduleExists(name)) {
              module.verbose('Changing default setting', newSettings, name);
              $.extend(true, $.fn[name].settings, newSettings);

              if (modifyExisting && namespace) {
                $existingModules = $(':data(module-' + namespace + ')');

                if ($existingModules.length > 0) {
                  module.verbose('Modifying existing settings', $existingModules);
                  $existingModules[name]('setting', newSettings);
                }
              }
            }
          });
        }
      },
      enable: {
        console: function console() {
          module.console(true);
        },
        debug: function debug(modules, modifyExisting) {
          modules = modules || _settings.modules;
          module.debug('Enabling debug for modules', modules);
          module.change.setting('debug', true, modules, modifyExisting);
        },
        verbose: function verbose(modules, modifyExisting) {
          modules = modules || _settings.modules;
          module.debug('Enabling verbose debug for modules', modules);
          module.change.setting('verbose', true, modules, modifyExisting);
        }
      },
      disable: {
        console: function console() {
          module.console(false);
        },
        debug: function debug(modules, modifyExisting) {
          modules = modules || _settings.modules;
          module.debug('Disabling debug for modules', modules);
          module.change.setting('debug', false, modules, modifyExisting);
        },
        verbose: function verbose(modules, modifyExisting) {
          modules = modules || _settings.modules;
          module.debug('Disabling verbose debug for modules', modules);
          module.change.setting('verbose', false, modules, modifyExisting);
        }
      },
      console: function console(enable) {
        if (enable) {
          if (instance.cache.console === undefined) {
            module.error(error.console);
            return;
          }

          module.debug('Restoring console function');
          window.console = instance.cache.console;
        } else {
          module.debug('Disabling console function');
          instance.cache.console = window.console;
          window.console = {
            clear: function clear() {},
            error: function error() {},
            group: function group() {},
            groupCollapsed: function groupCollapsed() {},
            groupEnd: function groupEnd() {},
            info: function info() {},
            log: function log() {},
            markTimeline: function markTimeline() {},
            warn: function warn() {}
          };
        }
      },
      destroy: function destroy() {
        module.verbose('Destroying previous site for', $module);
        $module.removeData(moduleNamespace);
      },
      cache: {},
      setting: function setting(name, value) {
        if ($.isPlainObject(name)) {
          $.extend(true, _settings, name);
        } else if (value !== undefined) {
          _settings[name] = value;
        } else {
          return _settings[name];
        }
      },
      internal: function internal(name, value) {
        if ($.isPlainObject(name)) {
          $.extend(true, module, name);
        } else if (value !== undefined) {
          module[name] = value;
        } else {
          return module[name];
        }
      },
      debug: function debug() {
        if (_settings.debug) {
          if (_settings.performance) {
            module.performance.log(arguments);
          } else {
            module.debug = Function.prototype.bind.call(console.info, console, _settings.name + ':');
            module.debug.apply(console, arguments);
          }
        }
      },
      verbose: function verbose() {
        if (_settings.verbose && _settings.debug) {
          if (_settings.performance) {
            module.performance.log(arguments);
          } else {
            module.verbose = Function.prototype.bind.call(console.info, console, _settings.name + ':');
            module.verbose.apply(console, arguments);
          }
        }
      },
      error: function error() {
        module.error = Function.prototype.bind.call(console.error, console, _settings.name + ':');
        module.error.apply(console, arguments);
      },
      performance: {
        log: function log(message) {
          var currentTime, executionTime, previousTime;

          if (_settings.performance) {
            currentTime = new Date().getTime();
            previousTime = time || currentTime;
            executionTime = currentTime - previousTime;
            time = currentTime;
            performance.push({
              'Element': element,
              'Name': message[0],
              'Arguments': [].slice.call(message, 1) || '',
              'Execution Time': executionTime
            });
          }

          clearTimeout(module.performance.timer);
          module.performance.timer = setTimeout(module.performance.display, 500);
        },
        display: function display() {
          var title = _settings.name + ':',
              totalTime = 0;
          time = false;
          clearTimeout(module.performance.timer);
          $.each(performance, function (index, data) {
            totalTime += data['Execution Time'];
          });
          title += ' ' + totalTime + 'ms';

          if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
            console.groupCollapsed(title);

            if (console.table) {
              console.table(performance);
            } else {
              $.each(performance, function (index, data) {
                console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
              });
            }

            console.groupEnd();
          }

          performance = [];
        }
      },
      invoke: function invoke(query, passedArguments, context) {
        var object = instance,
            maxDepth,
            found,
            response;
        passedArguments = passedArguments || queryArguments;
        context = element || context;

        if (typeof query == 'string' && object !== undefined) {
          query = query.split(/[\. ]/);
          maxDepth = query.length - 1;
          $.each(query, function (depth, value) {
            var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

            if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
              object = object[camelCaseValue];
            } else if (object[camelCaseValue] !== undefined) {
              found = object[camelCaseValue];
              return false;
            } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
              object = object[value];
            } else if (object[value] !== undefined) {
              found = object[value];
              return false;
            } else {
              module.error(error.method, query);
              return false;
            }
          });
        }

        if ($.isFunction(found)) {
          response = found.apply(context, passedArguments);
        } else if (found !== undefined) {
          response = found;
        }

        if ($.isArray(returnedValue)) {
          returnedValue.push(response);
        } else if (returnedValue !== undefined) {
          returnedValue = [returnedValue, response];
        } else if (response !== undefined) {
          returnedValue = response;
        }

        return found;
      }
    };

    if (methodInvoked) {
      if (instance === undefined) {
        module.initialize();
      }

      module.invoke(query);
    } else {
      if (instance !== undefined) {
        module.destroy();
      }

      module.initialize();
    }

    return returnedValue !== undefined ? returnedValue : this;
  };

  $.site.settings = {
    name: 'Site',
    namespace: 'site',
    error: {
      console: 'Console cannot be restored, most likely it was overwritten outside of module',
      method: 'The method you called is not defined.'
    },
    debug: false,
    verbose: false,
    performance: true,
    modules: ['accordion', 'api', 'checkbox', 'dimmer', 'dropdown', 'embed', 'form', 'modal', 'nag', 'popup', 'rating', 'shape', 'sidebar', 'state', 'sticky', 'tab', 'transition', 'visit', 'visibility'],
    siteNamespace: 'site',
    namespaceStub: {
      cache: {},
      config: {},
      sections: {},
      section: {},
      utilities: {}
    }
  }; // allows for selection of elements with data attributes

  $.extend($.expr[":"], {
    data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
      return function (elem) {
        return !!$.data(elem, dataName);
      };
    }) : function (elem, i, match) {
      // support: jQuery < 1.8
      return !!$.data(elem, match[3]);
    }
  });
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Form Validation
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.form = function (parameters) {
    var $allModules = $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        legacyParameters = arguments[1],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;
    $allModules.each(function () {
      var $module = $(this),
          element = this,
          formErrors = [],
          keyHeldDown = false,
          // set at run-time
      $field,
          $group,
          $message,
          $prompt,
          $submit,
          $clear,
          $reset,
          _settings2,
          _validation,
          metadata,
          selector,
          className,
          regExp,
          error,
          namespace,
          moduleNamespace,
          eventNamespace,
          instance,
          module;

      module = {
        initialize: function initialize() {
          // settings grabbed at run time
          module.get.settings();

          if (methodInvoked) {
            if (instance === undefined) {
              module.instantiate();
            }

            module.invoke(query);
          } else {
            if (instance !== undefined) {
              instance.invoke('destroy');
            }

            module.verbose('Initializing form validation', $module, _settings2);
            module.bindEvents();
            module.set.defaults();
            module.instantiate();
          }
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module.data(moduleNamespace, module);
        },
        destroy: function destroy() {
          module.verbose('Destroying previous module', instance);
          module.removeEvents();
          $module.removeData(moduleNamespace);
        },
        refresh: function refresh() {
          module.verbose('Refreshing selector cache');
          $field = $module.find(selector.field);
          $group = $module.find(selector.group);
          $message = $module.find(selector.message);
          $prompt = $module.find(selector.prompt);
          $submit = $module.find(selector.submit);
          $clear = $module.find(selector.clear);
          $reset = $module.find(selector.reset);
        },
        submit: function submit() {
          module.verbose('Submitting form', $module);
          $module.submit();
        },
        attachEvents: function attachEvents(selector, action) {
          action = action || 'submit';
          $(selector).on('click' + eventNamespace, function (event) {
            module[action]();
            event.preventDefault();
          });
        },
        bindEvents: function bindEvents() {
          module.verbose('Attaching form events');
          $module.on('submit' + eventNamespace, module.validate.form).on('blur' + eventNamespace, selector.field, module.event.field.blur).on('click' + eventNamespace, selector.submit, module.submit).on('click' + eventNamespace, selector.reset, module.reset).on('click' + eventNamespace, selector.clear, module.clear);

          if (_settings2.keyboardShortcuts) {
            $module.on('keydown' + eventNamespace, selector.field, module.event.field.keydown);
          }

          $field.each(function () {
            var $input = $(this),
                type = $input.prop('type'),
                inputEvent = module.get.changeEvent(type, $input);
            $(this).on(inputEvent + eventNamespace, module.event.field.change);
          });
        },
        clear: function clear() {
          $field.each(function () {
            var $field = $(this),
                $element = $field.parent(),
                $fieldGroup = $field.closest($group),
                $prompt = $fieldGroup.find(selector.prompt),
                defaultValue = $field.data(metadata.defaultValue) || '',
                isCheckbox = $element.is(selector.uiCheckbox),
                isDropdown = $element.is(selector.uiDropdown),
                isErrored = $fieldGroup.hasClass(className.error);

            if (isErrored) {
              module.verbose('Resetting error on field', $fieldGroup);
              $fieldGroup.removeClass(className.error);
              $prompt.remove();
            }

            if (isDropdown) {
              module.verbose('Resetting dropdown value', $element, defaultValue);
              $element.dropdown('clear');
            } else if (isCheckbox) {
              $field.prop('checked', false);
            } else {
              module.verbose('Resetting field value', $field, defaultValue);
              $field.val('');
            }
          });
        },
        reset: function reset() {
          $field.each(function () {
            var $field = $(this),
                $element = $field.parent(),
                $fieldGroup = $field.closest($group),
                $prompt = $fieldGroup.find(selector.prompt),
                defaultValue = $field.data(metadata.defaultValue),
                isCheckbox = $element.is(selector.uiCheckbox),
                isDropdown = $element.is(selector.uiDropdown),
                isErrored = $fieldGroup.hasClass(className.error);

            if (defaultValue === undefined) {
              return;
            }

            if (isErrored) {
              module.verbose('Resetting error on field', $fieldGroup);
              $fieldGroup.removeClass(className.error);
              $prompt.remove();
            }

            if (isDropdown) {
              module.verbose('Resetting dropdown value', $element, defaultValue);
              $element.dropdown('restore defaults');
            } else if (isCheckbox) {
              module.verbose('Resetting checkbox value', $element, defaultValue);
              $field.prop('checked', defaultValue);
            } else {
              module.verbose('Resetting field value', $field, defaultValue);
              $field.val(defaultValue);
            }
          });
        },
        determine: {
          isValid: function isValid() {
            var allValid = true;
            $.each(_validation, function (fieldName, field) {
              if (!module.validate.field(field, fieldName, true)) {
                allValid = false;
              }
            });
            return allValid;
          }
        },
        is: {
          bracketedRule: function bracketedRule(rule) {
            return rule.type && rule.type.match(_settings2.regExp.bracket);
          },
          shorthandFields: function shorthandFields(fields) {
            var fieldKeys = Object.keys(fields),
                firstRule = fields[fieldKeys[0]];
            return module.is.shorthandRules(firstRule);
          },
          // duck type rule test
          shorthandRules: function shorthandRules(rules) {
            return typeof rules == 'string' || $.isArray(rules);
          },
          empty: function empty($field) {
            if (!$field || $field.length === 0) {
              return true;
            } else if ($field.is('input[type="checkbox"]')) {
              return !$field.is(':checked');
            } else {
              return module.is.blank($field);
            }
          },
          blank: function blank($field) {
            return $.trim($field.val()) === '';
          },
          valid: function valid(field) {
            var allValid = true;

            if (field) {
              module.verbose('Checking if field is valid', field);
              return module.validate.field(_validation[field], field, false);
            } else {
              module.verbose('Checking if form is valid');
              $.each(_validation, function (fieldName, field) {
                if (!module.is.valid(fieldName)) {
                  allValid = false;
                }
              });
              return allValid;
            }
          }
        },
        removeEvents: function removeEvents() {
          $module.off(eventNamespace);
          $field.off(eventNamespace);
          $submit.off(eventNamespace);
          $field.off(eventNamespace);
        },
        event: {
          field: {
            keydown: function keydown(event) {
              var $field = $(this),
                  key = event.which,
                  isInput = $field.is(selector.input),
                  isCheckbox = $field.is(selector.checkbox),
                  isInDropdown = $field.closest(selector.uiDropdown).length > 0,
                  keyCode = {
                enter: 13,
                escape: 27
              };

              if (key == keyCode.escape) {
                module.verbose('Escape key pressed blurring field');
                $field.blur();
              }

              if (!event.ctrlKey && key == keyCode.enter && isInput && !isInDropdown && !isCheckbox) {
                if (!keyHeldDown) {
                  $field.one('keyup' + eventNamespace, module.event.field.keyup);
                  module.submit();
                  module.debug('Enter pressed on input submitting form');
                }

                keyHeldDown = true;
              }
            },
            keyup: function keyup() {
              keyHeldDown = false;
            },
            blur: function blur(event) {
              var $field = $(this),
                  $fieldGroup = $field.closest($group),
                  validationRules = module.get.validation($field);

              if ($fieldGroup.hasClass(className.error)) {
                module.debug('Revalidating field', $field, validationRules);

                if (validationRules) {
                  module.validate.field(validationRules);
                }
              } else if (_settings2.on == 'blur') {
                if (validationRules) {
                  module.validate.field(validationRules);
                }
              }
            },
            change: function change(event) {
              var $field = $(this),
                  $fieldGroup = $field.closest($group),
                  validationRules = module.get.validation($field);

              if (validationRules && (_settings2.on == 'change' || $fieldGroup.hasClass(className.error) && _settings2.revalidate)) {
                clearTimeout(module.timer);
                module.timer = setTimeout(function () {
                  module.debug('Revalidating field', $field, module.get.validation($field));
                  module.validate.field(validationRules);
                }, _settings2.delay);
              }
            }
          }
        },
        get: {
          ancillaryValue: function ancillaryValue(rule) {
            if (!rule.type || !rule.value && !module.is.bracketedRule(rule)) {
              return false;
            }

            return rule.value !== undefined ? rule.value : rule.type.match(_settings2.regExp.bracket)[1] + '';
          },
          ruleName: function ruleName(rule) {
            if (module.is.bracketedRule(rule)) {
              return rule.type.replace(rule.type.match(_settings2.regExp.bracket)[0], '');
            }

            return rule.type;
          },
          changeEvent: function changeEvent(type, $input) {
            if (type == 'checkbox' || type == 'radio' || type == 'hidden' || $input.is('select')) {
              return 'change';
            } else {
              return module.get.inputEvent();
            }
          },
          inputEvent: function inputEvent() {
            return document.createElement('input').oninput !== undefined ? 'input' : document.createElement('input').onpropertychange !== undefined ? 'propertychange' : 'keyup';
          },
          fieldsFromShorthand: function fieldsFromShorthand(fields) {
            var fullFields = {};
            $.each(fields, function (name, rules) {
              if (typeof rules == 'string') {
                rules = [rules];
              }

              fullFields[name] = {
                rules: []
              };
              $.each(rules, function (index, rule) {
                fullFields[name].rules.push({
                  type: rule
                });
              });
            });
            return fullFields;
          },
          prompt: function prompt(rule, field) {
            var ruleName = module.get.ruleName(rule),
                ancillary = module.get.ancillaryValue(rule),
                $field = module.get.field(field.identifier),
                value = $field.val(),
                prompt = $.isFunction(rule.prompt) ? rule.prompt(value) : rule.prompt || _settings2.prompt[ruleName] || _settings2.text.unspecifiedRule,
                requiresValue = prompt.search('{value}') !== -1,
                requiresName = prompt.search('{name}') !== -1,
                $label,
                name;

            if (requiresValue) {
              prompt = prompt.replace('{value}', $field.val());
            }

            if (requiresName) {
              $label = $field.closest(selector.group).find('label').eq(0);
              name = $label.length == 1 ? $label.text() : $field.prop('placeholder') || _settings2.text.unspecifiedField;
              prompt = prompt.replace('{name}', name);
            }

            prompt = prompt.replace('{identifier}', field.identifier);
            prompt = prompt.replace('{ruleValue}', ancillary);

            if (!rule.prompt) {
              module.verbose('Using default validation prompt for type', prompt, ruleName);
            }

            return prompt;
          },
          settings: function settings() {
            if ($.isPlainObject(parameters)) {
              var keys = Object.keys(parameters),
                  isLegacySettings = keys.length > 0 ? parameters[keys[0]].identifier !== undefined && parameters[keys[0]].rules !== undefined : false,
                  ruleKeys;

              if (isLegacySettings) {
                // 1.x (ducktyped)
                _settings2 = $.extend(true, {}, $.fn.form.settings, legacyParameters);
                _validation = $.extend({}, $.fn.form.settings.defaults, parameters);
                module.error(_settings2.error.oldSyntax, element);
                module.verbose('Extending settings from legacy parameters', _validation, _settings2);
              } else {
                // 2.x
                if (parameters.fields && module.is.shorthandFields(parameters.fields)) {
                  parameters.fields = module.get.fieldsFromShorthand(parameters.fields);
                }

                _settings2 = $.extend(true, {}, $.fn.form.settings, parameters);
                _validation = $.extend({}, $.fn.form.settings.defaults, _settings2.fields);
                module.verbose('Extending settings', _validation, _settings2);
              }
            } else {
              _settings2 = $.fn.form.settings;
              _validation = $.fn.form.settings.defaults;
              module.verbose('Using default form validation', _validation, _settings2);
            } // shorthand


            namespace = _settings2.namespace;
            metadata = _settings2.metadata;
            selector = _settings2.selector;
            className = _settings2.className;
            regExp = _settings2.regExp;
            error = _settings2.error;
            moduleNamespace = 'module-' + namespace;
            eventNamespace = '.' + namespace; // grab instance

            instance = $module.data(moduleNamespace); // refresh selector cache

            module.refresh();
          },
          field: function field(identifier) {
            module.verbose('Finding field with identifier', identifier);
            identifier = module.escape.string(identifier);

            if ($field.filter('#' + identifier).length > 0) {
              return $field.filter('#' + identifier);
            } else if ($field.filter('[name="' + identifier + '"]').length > 0) {
              return $field.filter('[name="' + identifier + '"]');
            } else if ($field.filter('[name="' + identifier + '[]"]').length > 0) {
              return $field.filter('[name="' + identifier + '[]"]');
            } else if ($field.filter('[data-' + metadata.validate + '="' + identifier + '"]').length > 0) {
              return $field.filter('[data-' + metadata.validate + '="' + identifier + '"]');
            }

            return $('<input/>');
          },
          fields: function (_fields) {
            function fields(_x) {
              return _fields.apply(this, arguments);
            }

            fields.toString = function () {
              return _fields.toString();
            };

            return fields;
          }(function (fields) {
            var $fields = $();
            $.each(fields, function (index, name) {
              $fields = $fields.add(module.get.field(name));
            });
            return $fields;
          }),
          validation: function validation($field) {
            var fieldValidation, identifier;

            if (!_validation) {
              return false;
            }

            $.each(_validation, function (fieldName, field) {
              identifier = field.identifier || fieldName;

              if (module.get.field(identifier)[0] == $field[0]) {
                field.identifier = identifier;
                fieldValidation = field;
              }
            });
            return fieldValidation || false;
          },
          value: function value(field) {
            var fields = [],
                results;
            fields.push(field);
            results = module.get.values.call(element, fields);
            return results[field];
          },
          values: function values(fields) {
            var $fields = $.isArray(fields) ? module.get.fields(fields) : $field,
                values = {};
            $fields.each(function (index, field) {
              var $field = $(field),
                  type = $field.prop('type'),
                  name = $field.prop('name'),
                  value = $field.val(),
                  isCheckbox = $field.is(selector.checkbox),
                  isRadio = $field.is(selector.radio),
                  isMultiple = name.indexOf('[]') !== -1,
                  isChecked = isCheckbox ? $field.is(':checked') : false;

              if (name) {
                if (isMultiple) {
                  name = name.replace('[]', '');

                  if (!values[name]) {
                    values[name] = [];
                  }

                  if (isCheckbox) {
                    if (isChecked) {
                      values[name].push(value || true);
                    } else {
                      values[name].push(false);
                    }
                  } else {
                    values[name].push(value);
                  }
                } else {
                  if (isRadio) {
                    if (values[name] === undefined || values[name] == false) {
                      values[name] = isChecked ? value || true : false;
                    }
                  } else if (isCheckbox) {
                    if (isChecked) {
                      values[name] = value || true;
                    } else {
                      values[name] = false;
                    }
                  } else {
                    values[name] = value;
                  }
                }
              }
            });
            return values;
          }
        },
        has: {
          field: function field(identifier) {
            module.verbose('Checking for existence of a field with identifier', identifier);
            identifier = module.escape.string(identifier);

            if (typeof identifier !== 'string') {
              module.error(error.identifier, identifier);
            }

            if ($field.filter('#' + identifier).length > 0) {
              return true;
            } else if ($field.filter('[name="' + identifier + '"]').length > 0) {
              return true;
            } else if ($field.filter('[data-' + metadata.validate + '="' + identifier + '"]').length > 0) {
              return true;
            }

            return false;
          }
        },
        escape: {
          string: function string(text) {
            text = String(text);
            return text.replace(regExp.escape, '\\$&');
          }
        },
        add: {
          // alias
          rule: function rule(name, rules) {
            module.add.field(name, rules);
          },
          field: function field(name, rules) {
            var newValidation = {};

            if (module.is.shorthandRules(rules)) {
              rules = $.isArray(rules) ? rules : [rules];
              newValidation[name] = {
                rules: []
              };
              $.each(rules, function (index, rule) {
                newValidation[name].rules.push({
                  type: rule
                });
              });
            } else {
              newValidation[name] = rules;
            }

            _validation = $.extend({}, _validation, newValidation);
            module.debug('Adding rules', newValidation, _validation);
          },
          fields: function (_fields2) {
            function fields(_x2) {
              return _fields2.apply(this, arguments);
            }

            fields.toString = function () {
              return _fields2.toString();
            };

            return fields;
          }(function (fields) {
            var newValidation;

            if (fields && module.is.shorthandFields(fields)) {
              newValidation = module.get.fieldsFromShorthand(fields);
            } else {
              newValidation = fields;
            }

            _validation = $.extend({}, _validation, newValidation);
          }),
          prompt: function prompt(identifier, errors) {
            var $field = module.get.field(identifier),
                $fieldGroup = $field.closest($group),
                $prompt = $fieldGroup.children(selector.prompt),
                promptExists = $prompt.length !== 0;
            errors = typeof errors == 'string' ? [errors] : errors;
            module.verbose('Adding field error state', identifier);
            $fieldGroup.addClass(className.error);

            if (_settings2.inline) {
              if (!promptExists) {
                $prompt = _settings2.templates.prompt(errors);
                $prompt.appendTo($fieldGroup);
              }

              $prompt.html(errors[0]);

              if (!promptExists) {
                if (_settings2.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                  module.verbose('Displaying error with css transition', _settings2.transition);
                  $prompt.transition(_settings2.transition + ' in', _settings2.duration);
                } else {
                  module.verbose('Displaying error with fallback javascript animation');
                  $prompt.fadeIn(_settings2.duration);
                }
              } else {
                module.verbose('Inline errors are disabled, no inline error added', identifier);
              }
            }
          },
          errors: function errors(_errors) {
            module.debug('Adding form error messages', _errors);
            module.set.error();
            $message.html(_settings2.templates.error(_errors));
          }
        },
        remove: {
          rule: function rule(field, _rule) {
            var rules = $.isArray(_rule) ? _rule : [_rule];

            if (_rule == undefined) {
              module.debug('Removed all rules');
              _validation[field].rules = [];
              return;
            }

            if (_validation[field] == undefined || !$.isArray(_validation[field].rules)) {
              return;
            }

            $.each(_validation[field].rules, function (index, rule) {
              if (rules.indexOf(rule.type) !== -1) {
                module.debug('Removed rule', rule.type);

                _validation[field].rules.splice(index, 1);
              }
            });
          },
          field: function field(_field) {
            var fields = $.isArray(_field) ? _field : [_field];
            $.each(fields, function (index, field) {
              module.remove.rule(field);
            });
          },
          // alias
          rules: function rules(field, _rules) {
            if ($.isArray(field)) {
              $.each(fields, function (index, field) {
                module.remove.rule(field, _rules);
              });
            } else {
              module.remove.rule(field, _rules);
            }
          },
          fields: function (_fields3) {
            function fields(_x3) {
              return _fields3.apply(this, arguments);
            }

            fields.toString = function () {
              return _fields3.toString();
            };

            return fields;
          }(function (fields) {
            module.remove.field(fields);
          }),
          prompt: function prompt(identifier) {
            var $field = module.get.field(identifier),
                $fieldGroup = $field.closest($group),
                $prompt = $fieldGroup.children(selector.prompt);
            $fieldGroup.removeClass(className.error);

            if (_settings2.inline && $prompt.is(':visible')) {
              module.verbose('Removing prompt for field', identifier);

              if (_settings2.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                $prompt.transition(_settings2.transition + ' out', _settings2.duration, function () {
                  $prompt.remove();
                });
              } else {
                $prompt.fadeOut(_settings2.duration, function () {
                  $prompt.remove();
                });
              }
            }
          }
        },
        set: {
          success: function success() {
            $module.removeClass(className.error).addClass(className.success);
          },
          defaults: function defaults() {
            $field.each(function () {
              var $field = $(this),
                  isCheckbox = $field.filter(selector.checkbox).length > 0,
                  value = isCheckbox ? $field.is(':checked') : $field.val();
              $field.data(metadata.defaultValue, value);
            });
          },
          error: function error() {
            $module.removeClass(className.success).addClass(className.error);
          },
          value: function value(field, _value) {
            var fields = {};
            fields[field] = _value;
            return module.set.values.call(element, fields);
          },
          values: function values(fields) {
            if ($.isEmptyObject(fields)) {
              return;
            }

            $.each(fields, function (key, value) {
              var $field = module.get.field(key),
                  $element = $field.parent(),
                  isMultiple = $.isArray(value),
                  isCheckbox = $element.is(selector.uiCheckbox),
                  isDropdown = $element.is(selector.uiDropdown),
                  isRadio = $field.is(selector.radio) && isCheckbox,
                  fieldExists = $field.length > 0,
                  $multipleField;

              if (fieldExists) {
                if (isMultiple && isCheckbox) {
                  module.verbose('Selecting multiple', value, $field);
                  $element.checkbox('uncheck');
                  $.each(value, function (index, value) {
                    $multipleField = $field.filter('[value="' + value + '"]');
                    $element = $multipleField.parent();

                    if ($multipleField.length > 0) {
                      $element.checkbox('check');
                    }
                  });
                } else if (isRadio) {
                  module.verbose('Selecting radio value', value, $field);
                  $field.filter('[value="' + value + '"]').parent(selector.uiCheckbox).checkbox('check');
                } else if (isCheckbox) {
                  module.verbose('Setting checkbox value', value, $element);

                  if (value === true) {
                    $element.checkbox('check');
                  } else {
                    $element.checkbox('uncheck');
                  }
                } else if (isDropdown) {
                  module.verbose('Setting dropdown value', value, $element);
                  $element.dropdown('set selected', value);
                } else {
                  module.verbose('Setting field value', value, $field);
                  $field.val(value);
                }
              }
            });
          }
        },
        validate: {
          form: function form(event, ignoreCallbacks) {
            var values = module.get.values(),
                apiRequest; // input keydown event will fire submit repeatedly by browser default

            if (keyHeldDown) {
              return false;
            } // reset errors


            formErrors = [];

            if (module.determine.isValid()) {
              module.debug('Form has no validation errors, submitting');
              module.set.success();

              if (ignoreCallbacks !== true) {
                return _settings2.onSuccess.call(element, event, values);
              }
            } else {
              module.debug('Form has errors');
              module.set.error();

              if (!_settings2.inline) {
                module.add.errors(formErrors);
              } // prevent ajax submit


              if ($module.data('moduleApi') !== undefined) {
                event.stopImmediatePropagation();
              }

              if (ignoreCallbacks !== true) {
                return _settings2.onFailure.call(element, formErrors, values);
              }
            }
          },
          // takes a validation object and returns whether field passes validation
          field: function field(_field2, fieldName, showErrors) {
            showErrors = showErrors !== undefined ? showErrors : true;

            if (typeof _field2 == 'string') {
              module.verbose('Validating field', _field2);
              fieldName = _field2;
              _field2 = _validation[_field2];
            }

            var identifier = _field2.identifier || fieldName,
                $field = module.get.field(identifier),
                $dependsField = _field2.depends ? module.get.field(_field2.depends) : false,
                fieldValid = true,
                fieldErrors = [];

            if (!_field2.identifier) {
              module.debug('Using field name as identifier', identifier);
              _field2.identifier = identifier;
            }

            if ($field.prop('disabled')) {
              module.debug('Field is disabled. Skipping', identifier);
              fieldValid = true;
            } else if (_field2.optional && module.is.blank($field)) {
              module.debug('Field is optional and blank. Skipping', identifier);
              fieldValid = true;
            } else if (_field2.depends && module.is.empty($dependsField)) {
              module.debug('Field depends on another value that is not present or empty. Skipping', $dependsField);
              fieldValid = true;
            } else if (_field2.rules !== undefined) {
              $.each(_field2.rules, function (index, rule) {
                if (module.has.field(identifier) && !module.validate.rule(_field2, rule)) {
                  module.debug('Field is invalid', identifier, rule.type);
                  fieldErrors.push(module.get.prompt(rule, _field2));
                  fieldValid = false;
                }
              });
            }

            if (fieldValid) {
              if (showErrors) {
                module.remove.prompt(identifier, fieldErrors);

                _settings2.onValid.call($field);
              }
            } else {
              if (showErrors) {
                formErrors = formErrors.concat(fieldErrors);
                module.add.prompt(identifier, fieldErrors);

                _settings2.onInvalid.call($field, fieldErrors);
              }

              return false;
            }

            return true;
          },
          // takes validation rule and returns whether field passes rule
          rule: function rule(field, _rule2) {
            var $field = module.get.field(field.identifier),
                type = _rule2.type,
                value = $field.val(),
                isValid = true,
                ancillary = module.get.ancillaryValue(_rule2),
                ruleName = module.get.ruleName(_rule2),
                ruleFunction = _settings2.rules[ruleName];

            if (!$.isFunction(ruleFunction)) {
              module.error(error.noRule, ruleName);
              return;
            } // cast to string avoiding encoding special values


            value = value === undefined || value === '' || value === null ? '' : $.trim(value + '');
            return ruleFunction.call($field, value, ancillary);
          }
        },
        setting: function setting(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, _settings2, name);
          } else if (value !== undefined) {
            _settings2[name] = value;
          } else {
            return _settings2[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!_settings2.silent && _settings2.debug) {
            if (_settings2.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, _settings2.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!_settings2.silent && _settings2.verbose && _settings2.debug) {
            if (_settings2.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, _settings2.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!_settings2.silent) {
            module.error = Function.prototype.bind.call(console.error, console, _settings2.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (_settings2.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = _settings2.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ($allModules.length > 1) {
              title += ' ' + '(' + $allModules.length + ')';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };
      module.initialize();
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.form.settings = {
    name: 'Form',
    namespace: 'form',
    debug: false,
    verbose: false,
    performance: true,
    fields: false,
    keyboardShortcuts: true,
    on: 'submit',
    inline: false,
    delay: 200,
    revalidate: true,
    transition: 'scale',
    duration: 200,
    onValid: function onValid() {},
    onInvalid: function onInvalid() {},
    onSuccess: function onSuccess() {
      return true;
    },
    onFailure: function onFailure() {
      return false;
    },
    metadata: {
      defaultValue: 'default',
      validate: 'validate'
    },
    regExp: {
      htmlID: /^[a-zA-Z][\w:.-]*$/g,
      bracket: /\[(.*)\]/i,
      decimal: /^\d+\.?\d*$/,
      email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
      escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
      flags: /^\/(.*)\/(.*)?/,
      integer: /^\-?\d+$/,
      number: /^\-?\d*(\.\d+)?$/,
      url: /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i
    },
    text: {
      unspecifiedRule: 'Please enter a valid value',
      unspecifiedField: 'This field'
    },
    prompt: {
      empty: '{name} must have a value',
      checked: '{name} must be checked',
      email: '{name} must be a valid e-mail',
      url: '{name} must be a valid url',
      regExp: '{name} is not formatted correctly',
      integer: '{name} must be an integer',
      decimal: '{name} must be a decimal number',
      number: '{name} must be set to a number',
      is: '{name} must be "{ruleValue}"',
      isExactly: '{name} must be exactly "{ruleValue}"',
      not: '{name} cannot be set to "{ruleValue}"',
      notExactly: '{name} cannot be set to exactly "{ruleValue}"',
      contain: '{name} must contain "{ruleValue}"',
      containExactly: '{name} must contain exactly "{ruleValue}"',
      doesntContain: '{name} cannot contain  "{ruleValue}"',
      doesntContainExactly: '{name} cannot contain exactly "{ruleValue}"',
      minLength: '{name} must be at least {ruleValue} characters',
      length: '{name} must be at least {ruleValue} characters',
      exactLength: '{name} must be exactly {ruleValue} characters',
      maxLength: '{name} cannot be longer than {ruleValue} characters',
      match: '{name} must match {ruleValue} field',
      different: '{name} must have a different value than {ruleValue} field',
      creditCard: '{name} must be a valid credit card number',
      minCount: '{name} must have at least {ruleValue} choices',
      exactCount: '{name} must have exactly {ruleValue} choices',
      maxCount: '{name} must have {ruleValue} or less choices'
    },
    selector: {
      checkbox: 'input[type="checkbox"], input[type="radio"]',
      clear: '.clear',
      field: 'input, textarea, select',
      group: '.field',
      input: 'input',
      message: '.error.message',
      prompt: '.prompt.label',
      radio: 'input[type="radio"]',
      reset: '.reset:not([type="reset"])',
      submit: '.submit:not([type="submit"])',
      uiCheckbox: '.ui.checkbox',
      uiDropdown: '.ui.dropdown'
    },
    className: {
      error: 'error',
      label: 'ui prompt label',
      pressed: 'down',
      success: 'success'
    },
    error: {
      identifier: 'You must specify a string identifier for each field',
      method: 'The method you called is not defined.',
      noRule: 'There is no rule matching the one you specified',
      oldSyntax: 'Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically.'
    },
    templates: {
      // template that produces error message
      error: function error(errors) {
        var html = '<ul class="list">';
        $.each(errors, function (index, value) {
          html += '<li>' + value + '</li>';
        });
        html += '</ul>';
        return $(html);
      },
      // template that produces label
      prompt: function prompt(errors) {
        return $('<div/>').addClass('ui basic red pointing prompt label').html(errors[0]);
      }
    },
    rules: {
      // is not empty or blank string
      empty: function empty(value) {
        return !(value === undefined || '' === value || $.isArray(value) && value.length === 0);
      },
      // checkbox checked
      checked: function checked() {
        return $(this).filter(':checked').length > 0;
      },
      // is most likely an email
      email: function email(value) {
        return $.fn.form.settings.regExp.email.test(value);
      },
      // value is most likely url
      url: function url(value) {
        return $.fn.form.settings.regExp.url.test(value);
      },
      // matches specified regExp
      regExp: function regExp(value, _regExp) {
        if (_regExp instanceof RegExp) {
          return value.match(_regExp);
        }

        var regExpParts = _regExp.match($.fn.form.settings.regExp.flags),
            flags; // regular expression specified as /baz/gi (flags)


        if (regExpParts) {
          _regExp = regExpParts.length >= 2 ? regExpParts[1] : _regExp;
          flags = regExpParts.length >= 3 ? regExpParts[2] : '';
        }

        return value.match(new RegExp(_regExp, flags));
      },
      // is valid integer or matches range
      integer: function integer(value, range) {
        var intRegExp = $.fn.form.settings.regExp.integer,
            min,
            max,
            parts;

        if (!range || ['', '..'].indexOf(range) !== -1) {// do nothing
        } else if (range.indexOf('..') == -1) {
          if (intRegExp.test(range)) {
            min = max = range - 0;
          }
        } else {
          parts = range.split('..', 2);

          if (intRegExp.test(parts[0])) {
            min = parts[0] - 0;
          }

          if (intRegExp.test(parts[1])) {
            max = parts[1] - 0;
          }
        }

        return intRegExp.test(value) && (min === undefined || value >= min) && (max === undefined || value <= max);
      },
      // is valid number (with decimal)
      decimal: function decimal(value) {
        return $.fn.form.settings.regExp.decimal.test(value);
      },
      // is valid number
      number: function number(value) {
        return $.fn.form.settings.regExp.number.test(value);
      },
      // is value (case insensitive)
      is: function is(value, text) {
        text = typeof text == 'string' ? text.toLowerCase() : text;
        value = typeof value == 'string' ? value.toLowerCase() : value;
        return value == text;
      },
      // is value
      isExactly: function isExactly(value, text) {
        return value == text;
      },
      // value is not another value (case insensitive)
      not: function not(value, notValue) {
        value = typeof value == 'string' ? value.toLowerCase() : value;
        notValue = typeof notValue == 'string' ? notValue.toLowerCase() : notValue;
        return value != notValue;
      },
      // value is not another value (case sensitive)
      notExactly: function notExactly(value, notValue) {
        return value != notValue;
      },
      // value contains text (insensitive)
      contains: function contains(value, text) {
        // escape regex characters
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text, 'i')) !== -1;
      },
      // value contains text (case sensitive)
      containsExactly: function containsExactly(value, text) {
        // escape regex characters
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text)) !== -1;
      },
      // value contains text (insensitive)
      doesntContain: function doesntContain(value, text) {
        // escape regex characters
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text, 'i')) === -1;
      },
      // value contains text (case sensitive)
      doesntContainExactly: function doesntContainExactly(value, text) {
        // escape regex characters
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text)) === -1;
      },
      // is at least string length
      minLength: function minLength(value, requiredLength) {
        return value !== undefined ? value.length >= requiredLength : false;
      },
      // see rls notes for 2.0.6 (this is a duplicate of minLength)
      length: function length(value, requiredLength) {
        return value !== undefined ? value.length >= requiredLength : false;
      },
      // is exactly length
      exactLength: function exactLength(value, requiredLength) {
        return value !== undefined ? value.length == requiredLength : false;
      },
      // is less than length
      maxLength: function maxLength(value, _maxLength) {
        return value !== undefined ? value.length <= _maxLength : false;
      },
      // matches another field
      match: function match(value, identifier) {
        var $form = $(this),
            matchingValue;

        if ($('[data-validate="' + identifier + '"]').length > 0) {
          matchingValue = $('[data-validate="' + identifier + '"]').val();
        } else if ($('#' + identifier).length > 0) {
          matchingValue = $('#' + identifier).val();
        } else if ($('[name="' + identifier + '"]').length > 0) {
          matchingValue = $('[name="' + identifier + '"]').val();
        } else if ($('[name="' + identifier + '[]"]').length > 0) {
          matchingValue = $('[name="' + identifier + '[]"]');
        }

        return matchingValue !== undefined ? value.toString() == matchingValue.toString() : false;
      },
      // different than another field
      different: function different(value, identifier) {
        // use either id or name of field
        var $form = $(this),
            matchingValue;

        if ($('[data-validate="' + identifier + '"]').length > 0) {
          matchingValue = $('[data-validate="' + identifier + '"]').val();
        } else if ($('#' + identifier).length > 0) {
          matchingValue = $('#' + identifier).val();
        } else if ($('[name="' + identifier + '"]').length > 0) {
          matchingValue = $('[name="' + identifier + '"]').val();
        } else if ($('[name="' + identifier + '[]"]').length > 0) {
          matchingValue = $('[name="' + identifier + '[]"]');
        }

        return matchingValue !== undefined ? value.toString() !== matchingValue.toString() : false;
      },
      creditCard: function creditCard(cardNumber, cardTypes) {
        var cards = {
          visa: {
            pattern: /^4/,
            length: [16]
          },
          amex: {
            pattern: /^3[47]/,
            length: [15]
          },
          mastercard: {
            pattern: /^5[1-5]/,
            length: [16]
          },
          discover: {
            pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
            length: [16]
          },
          unionPay: {
            pattern: /^(62|88)/,
            length: [16, 17, 18, 19]
          },
          jcb: {
            pattern: /^35(2[89]|[3-8][0-9])/,
            length: [16]
          },
          maestro: {
            pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
            length: [12, 13, 14, 15, 16, 17, 18, 19]
          },
          dinersClub: {
            pattern: /^(30[0-5]|^36)/,
            length: [14]
          },
          laser: {
            pattern: /^(6304|670[69]|6771)/,
            length: [16, 17, 18, 19]
          },
          visaElectron: {
            pattern: /^(4026|417500|4508|4844|491(3|7))/,
            length: [16]
          }
        },
            valid = {},
            validCard = false,
            requiredTypes = typeof cardTypes == 'string' ? cardTypes.split(',') : false,
            unionPay,
            validation;

        if (typeof cardNumber !== 'string' || cardNumber.length === 0) {
          return;
        } // allow dashes in card


        cardNumber = cardNumber.replace(/[\-]/g, ''); // verify card types

        if (requiredTypes) {
          $.each(requiredTypes, function (index, type) {
            // verify each card type
            validation = cards[type];

            if (validation) {
              valid = {
                length: $.inArray(cardNumber.length, validation.length) !== -1,
                pattern: cardNumber.search(validation.pattern) !== -1
              };

              if (valid.length && valid.pattern) {
                validCard = true;
              }
            }
          });

          if (!validCard) {
            return false;
          }
        } // skip luhn for UnionPay


        unionPay = {
          number: $.inArray(cardNumber.length, cards.unionPay.length) !== -1,
          pattern: cardNumber.search(cards.unionPay.pattern) !== -1
        };

        if (unionPay.number && unionPay.pattern) {
          return true;
        } // verify luhn, adapted from  <https://gist.github.com/2134376>


        var length = cardNumber.length,
            multiple = 0,
            producedValue = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
            sum = 0;

        while (length--) {
          sum += producedValue[multiple][parseInt(cardNumber.charAt(length), 10)];
          multiple ^= 1;
        }

        return sum % 10 === 0 && sum > 0;
      },
      minCount: function minCount(value, _minCount) {
        if (_minCount == 0) {
          return true;
        }

        if (_minCount == 1) {
          return value !== '';
        }

        return value.split(',').length >= _minCount;
      },
      exactCount: function exactCount(value, _exactCount) {
        if (_exactCount == 0) {
          return value === '';
        }

        if (_exactCount == 1) {
          return value !== '' && value.search(',') === -1;
        }

        return value.split(',').length == _exactCount;
      },
      maxCount: function maxCount(value, _maxCount) {
        if (_maxCount == 0) {
          return false;
        }

        if (_maxCount == 1) {
          return value.search(',') === -1;
        }

        return value.split(',').length <= _maxCount;
      }
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Accordion
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.accordion = function (parameters) {
    var $allModules = $(this),
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      setTimeout(callback, 0);
    },
        returnedValue;

    $allModules.each(function () {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.accordion.settings, parameters) : $.extend({}, $.fn.accordion.settings),
          className = settings.className,
          namespace = settings.namespace,
          selector = settings.selector,
          error = settings.error,
          eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          moduleSelector = $allModules.selector || '',
          $module = $(this),
          $title = $module.find(selector.title),
          $content = $module.find(selector.content),
          element = this,
          instance = $module.data(moduleNamespace),
          observer,
          module;
      module = {
        initialize: function initialize() {
          module.debug('Initializing', $module);
          module.bind.events();

          if (settings.observeChanges) {
            module.observeChanges();
          }

          module.instantiate();
        },
        instantiate: function instantiate() {
          instance = module;
          $module.data(moduleNamespace, module);
        },
        destroy: function destroy() {
          module.debug('Destroying previous instance', $module);
          $module.off(eventNamespace).removeData(moduleNamespace);
        },
        refresh: function refresh() {
          $title = $module.find(selector.title);
          $content = $module.find(selector.content);
        },
        observeChanges: function observeChanges() {
          if ('MutationObserver' in window) {
            observer = new MutationObserver(function (mutations) {
              module.debug('DOM tree modified, updating selector cache');
              module.refresh();
            });
            observer.observe(element, {
              childList: true,
              subtree: true
            });
            module.debug('Setting up mutation observer', observer);
          }
        },
        bind: {
          events: function events() {
            module.debug('Binding delegated events');
            $module.on(settings.on + eventNamespace, selector.trigger, module.event.click);
          }
        },
        event: {
          click: function click() {
            module.toggle.call(this);
          }
        },
        toggle: function toggle(query) {
          var $activeTitle = query !== undefined ? typeof query === 'number' ? $title.eq(query) : $(query).closest(selector.title) : $(this).closest(selector.title),
              $activeContent = $activeTitle.next($content),
              isAnimating = $activeContent.hasClass(className.animating),
              isActive = $activeContent.hasClass(className.active),
              isOpen = isActive && !isAnimating,
              isOpening = !isActive && isAnimating;
          module.debug('Toggling visibility of content', $activeTitle);

          if (isOpen || isOpening) {
            if (settings.collapsible) {
              module.close.call($activeTitle);
            } else {
              module.debug('Cannot close accordion content collapsing is disabled');
            }
          } else {
            module.open.call($activeTitle);
          }
        },
        open: function open(query) {
          var $activeTitle = query !== undefined ? typeof query === 'number' ? $title.eq(query) : $(query).closest(selector.title) : $(this).closest(selector.title),
              $activeContent = $activeTitle.next($content),
              isAnimating = $activeContent.hasClass(className.animating),
              isActive = $activeContent.hasClass(className.active),
              isOpen = isActive || isAnimating;

          if (isOpen) {
            module.debug('Accordion already open, skipping', $activeContent);
            return;
          }

          module.debug('Opening accordion content', $activeTitle);
          settings.onOpening.call($activeContent);
          settings.onChanging.call($activeContent);

          if (settings.exclusive) {
            module.closeOthers.call($activeTitle);
          }

          $activeTitle.addClass(className.active);
          $activeContent.stop(true, true).addClass(className.animating);

          if (settings.animateChildren) {
            if ($.fn.transition !== undefined && $module.transition('is supported')) {
              $activeContent.children().transition({
                animation: 'fade in',
                queue: false,
                useFailSafe: true,
                debug: settings.debug,
                verbose: settings.verbose,
                duration: settings.duration
              });
            } else {
              $activeContent.children().stop(true, true).animate({
                opacity: 1
              }, settings.duration, module.resetOpacity);
            }
          }

          $activeContent.slideDown(settings.duration, settings.easing, function () {
            $activeContent.removeClass(className.animating).addClass(className.active);
            module.reset.display.call(this);
            settings.onOpen.call(this);
            settings.onChange.call(this);
          });
        },
        close: function close(query) {
          var $activeTitle = query !== undefined ? typeof query === 'number' ? $title.eq(query) : $(query).closest(selector.title) : $(this).closest(selector.title),
              $activeContent = $activeTitle.next($content),
              isAnimating = $activeContent.hasClass(className.animating),
              isActive = $activeContent.hasClass(className.active),
              isOpening = !isActive && isAnimating,
              isClosing = isActive && isAnimating;

          if ((isActive || isOpening) && !isClosing) {
            module.debug('Closing accordion content', $activeContent);
            settings.onClosing.call($activeContent);
            settings.onChanging.call($activeContent);
            $activeTitle.removeClass(className.active);
            $activeContent.stop(true, true).addClass(className.animating);

            if (settings.animateChildren) {
              if ($.fn.transition !== undefined && $module.transition('is supported')) {
                $activeContent.children().transition({
                  animation: 'fade out',
                  queue: false,
                  useFailSafe: true,
                  debug: settings.debug,
                  verbose: settings.verbose,
                  duration: settings.duration
                });
              } else {
                $activeContent.children().stop(true, true).animate({
                  opacity: 0
                }, settings.duration, module.resetOpacity);
              }
            }

            $activeContent.slideUp(settings.duration, settings.easing, function () {
              $activeContent.removeClass(className.animating).removeClass(className.active);
              module.reset.display.call(this);
              settings.onClose.call(this);
              settings.onChange.call(this);
            });
          }
        },
        closeOthers: function closeOthers(index) {
          var $activeTitle = index !== undefined ? $title.eq(index) : $(this).closest(selector.title),
              $parentTitles = $activeTitle.parents(selector.content).prev(selector.title),
              $activeAccordion = $activeTitle.closest(selector.accordion),
              activeSelector = selector.title + '.' + className.active + ':visible',
              activeContent = selector.content + '.' + className.active + ':visible',
              $openTitles,
              $nestedTitles,
              $openContents;

          if (settings.closeNested) {
            $openTitles = $activeAccordion.find(activeSelector).not($parentTitles);
            $openContents = $openTitles.next($content);
          } else {
            $openTitles = $activeAccordion.find(activeSelector).not($parentTitles);
            $nestedTitles = $activeAccordion.find(activeContent).find(activeSelector).not($parentTitles);
            $openTitles = $openTitles.not($nestedTitles);
            $openContents = $openTitles.next($content);
          }

          if ($openTitles.length > 0) {
            module.debug('Exclusive enabled, closing other content', $openTitles);
            $openTitles.removeClass(className.active);
            $openContents.removeClass(className.animating).stop(true, true);

            if (settings.animateChildren) {
              if ($.fn.transition !== undefined && $module.transition('is supported')) {
                $openContents.children().transition({
                  animation: 'fade out',
                  useFailSafe: true,
                  debug: settings.debug,
                  verbose: settings.verbose,
                  duration: settings.duration
                });
              } else {
                $openContents.children().stop(true, true).animate({
                  opacity: 0
                }, settings.duration, module.resetOpacity);
              }
            }

            $openContents.slideUp(settings.duration, settings.easing, function () {
              $(this).removeClass(className.active);
              module.reset.display.call(this);
            });
          }
        },
        reset: {
          display: function display() {
            module.verbose('Removing inline display from element', this);
            $(this).css('display', '');

            if ($(this).attr('style') === '') {
              $(this).attr('style', '').removeAttr('style');
            }
          },
          opacity: function opacity() {
            module.verbose('Removing inline opacity from element', this);
            $(this).css('opacity', '');

            if ($(this).attr('style') === '') {
              $(this).attr('style', '').removeAttr('style');
            }
          }
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          module.debug('Changing internal', name, value);

          if (value !== undefined) {
            if ($.isPlainObject(name)) {
              $.extend(true, module, name);
            } else {
              module[name] = value;
            }
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                module.error(error.method, query);
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.accordion.settings = {
    name: 'Accordion',
    namespace: 'accordion',
    silent: false,
    debug: false,
    verbose: false,
    performance: true,
    on: 'click',
    // event on title that opens accordion
    observeChanges: true,
    // whether accordion should automatically refresh on DOM insertion
    exclusive: true,
    // whether a single accordion content panel should be open at once
    collapsible: true,
    // whether accordion content can be closed
    closeNested: false,
    // whether nested content should be closed when a panel is closed
    animateChildren: true,
    // whether children opacity should be animated
    duration: 350,
    // duration of animation
    easing: 'easeOutQuad',
    // easing equation for animation
    onOpening: function onOpening() {},
    // callback before open animation
    onClosing: function onClosing() {},
    // callback before closing animation
    onChanging: function onChanging() {},
    // callback before closing or opening animation
    onOpen: function onOpen() {},
    // callback after open animation
    onClose: function onClose() {},
    // callback after closing animation
    onChange: function onChange() {},
    // callback after closing or opening animation
    error: {
      method: 'The method you called is not defined'
    },
    className: {
      active: 'active',
      animating: 'animating'
    },
    selector: {
      accordion: '.accordion',
      title: '.title',
      trigger: '.title',
      content: '.content'
    }
  }; // Adds easing

  $.extend($.easing, {
    easeOutQuad: function easeOutQuad(x, t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    }
  });
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Checkbox
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.checkbox = function (parameters) {
    var $allModules = $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;
    $allModules.each(function () {
      var settings = $.extend(true, {}, $.fn.checkbox.settings, parameters),
          className = settings.className,
          namespace = settings.namespace,
          selector = settings.selector,
          error = settings.error,
          eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          $module = $(this),
          $label = $(this).children(selector.label),
          $input = $(this).children(selector.input),
          input = $input[0],
          _initialLoad = false,
          shortcutPressed = false,
          instance = $module.data(moduleNamespace),
          observer,
          element = this,
          module;
      module = {
        initialize: function initialize() {
          module.verbose('Initializing checkbox', settings);
          module.create.label();
          module.bind.events();
          module.set.tabbable();
          module.hide.input();
          module.observeChanges();
          module.instantiate();
          module.setup();
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module.data(moduleNamespace, module);
        },
        destroy: function destroy() {
          module.verbose('Destroying module');
          module.unbind.events();
          module.show.input();
          $module.removeData(moduleNamespace);
        },
        fix: {
          reference: function reference() {
            if ($module.is(selector.input)) {
              module.debug('Behavior called on <input> adjusting invoked element');
              $module = $module.closest(selector.checkbox);
              module.refresh();
            }
          }
        },
        setup: function setup() {
          module.set.initialLoad();

          if (module.is.indeterminate()) {
            module.debug('Initial value is indeterminate');
            module.indeterminate();
          } else if (module.is.checked()) {
            module.debug('Initial value is checked');
            module.check();
          } else {
            module.debug('Initial value is unchecked');
            module.uncheck();
          }

          module.remove.initialLoad();
        },
        refresh: function refresh() {
          $label = $module.children(selector.label);
          $input = $module.children(selector.input);
          input = $input[0];
        },
        hide: {
          input: function input() {
            module.verbose('Modifying <input> z-index to be unselectable');
            $input.addClass(className.hidden);
          }
        },
        show: {
          input: function input() {
            module.verbose('Modifying <input> z-index to be selectable');
            $input.removeClass(className.hidden);
          }
        },
        observeChanges: function observeChanges() {
          if ('MutationObserver' in window) {
            observer = new MutationObserver(function (mutations) {
              module.debug('DOM tree modified, updating selector cache');
              module.refresh();
            });
            observer.observe(element, {
              childList: true,
              subtree: true
            });
            module.debug('Setting up mutation observer', observer);
          }
        },
        attachEvents: function attachEvents(selector, event) {
          var $element = $(selector);
          event = $.isFunction(module[event]) ? module[event] : module.toggle;

          if ($element.length > 0) {
            module.debug('Attaching checkbox events to element', selector, event);
            $element.on('click' + eventNamespace, event);
          } else {
            module.error(error.notFound);
          }
        },
        event: {
          click: function click(event) {
            var $target = $(event.target);

            if ($target.is(selector.input)) {
              module.verbose('Using default check action on initialized checkbox');
              return;
            }

            if ($target.is(selector.link)) {
              module.debug('Clicking link inside checkbox, skipping toggle');
              return;
            }

            module.toggle();
            $input.focus();
            event.preventDefault();
          },
          keydown: function keydown(event) {
            var key = event.which,
                keyCode = {
              enter: 13,
              space: 32,
              escape: 27
            };

            if (key == keyCode.escape) {
              module.verbose('Escape key pressed blurring field');
              $input.blur();
              shortcutPressed = true;
            } else if (!event.ctrlKey && (key == keyCode.space || key == keyCode.enter)) {
              module.verbose('Enter/space key pressed, toggling checkbox');
              module.toggle();
              shortcutPressed = true;
            } else {
              shortcutPressed = false;
            }
          },
          keyup: function keyup(event) {
            if (shortcutPressed) {
              event.preventDefault();
            }
          }
        },
        check: function check() {
          if (!module.should.allowCheck()) {
            return;
          }

          module.debug('Checking checkbox', $input);
          module.set.checked();

          if (!module.should.ignoreCallbacks()) {
            settings.onChecked.call(input);
            settings.onChange.call(input);
          }
        },
        uncheck: function uncheck() {
          if (!module.should.allowUncheck()) {
            return;
          }

          module.debug('Unchecking checkbox');
          module.set.unchecked();

          if (!module.should.ignoreCallbacks()) {
            settings.onUnchecked.call(input);
            settings.onChange.call(input);
          }
        },
        indeterminate: function indeterminate() {
          if (module.should.allowIndeterminate()) {
            module.debug('Checkbox is already indeterminate');
            return;
          }

          module.debug('Making checkbox indeterminate');
          module.set.indeterminate();

          if (!module.should.ignoreCallbacks()) {
            settings.onIndeterminate.call(input);
            settings.onChange.call(input);
          }
        },
        determinate: function determinate() {
          if (module.should.allowDeterminate()) {
            module.debug('Checkbox is already determinate');
            return;
          }

          module.debug('Making checkbox determinate');
          module.set.determinate();

          if (!module.should.ignoreCallbacks()) {
            settings.onDeterminate.call(input);
            settings.onChange.call(input);
          }
        },
        enable: function enable() {
          if (module.is.enabled()) {
            module.debug('Checkbox is already enabled');
            return;
          }

          module.debug('Enabling checkbox');
          module.set.enabled();
          settings.onEnable.call(input); // preserve legacy callbacks

          settings.onEnabled.call(input);
        },
        disable: function disable() {
          if (module.is.disabled()) {
            module.debug('Checkbox is already disabled');
            return;
          }

          module.debug('Disabling checkbox');
          module.set.disabled();
          settings.onDisable.call(input); // preserve legacy callbacks

          settings.onDisabled.call(input);
        },
        get: {
          radios: function radios() {
            var name = module.get.name();
            return $('input[name="' + name + '"]').closest(selector.checkbox);
          },
          otherRadios: function otherRadios() {
            return module.get.radios().not($module);
          },
          name: function name() {
            return $input.attr('name');
          }
        },
        is: {
          initialLoad: function initialLoad() {
            return _initialLoad;
          },
          radio: function radio() {
            return $input.hasClass(className.radio) || $input.attr('type') == 'radio';
          },
          indeterminate: function indeterminate() {
            return $input.prop('indeterminate') !== undefined && $input.prop('indeterminate');
          },
          checked: function checked() {
            return $input.prop('checked') !== undefined && $input.prop('checked');
          },
          disabled: function disabled() {
            return $input.prop('disabled') !== undefined && $input.prop('disabled');
          },
          enabled: function enabled() {
            return !module.is.disabled();
          },
          determinate: function determinate() {
            return !module.is.indeterminate();
          },
          unchecked: function unchecked() {
            return !module.is.checked();
          }
        },
        should: {
          allowCheck: function allowCheck() {
            if (module.is.determinate() && module.is.checked() && !module.should.forceCallbacks()) {
              module.debug('Should not allow check, checkbox is already checked');
              return false;
            }

            if (settings.beforeChecked.apply(input) === false) {
              module.debug('Should not allow check, beforeChecked cancelled');
              return false;
            }

            return true;
          },
          allowUncheck: function allowUncheck() {
            if (module.is.determinate() && module.is.unchecked() && !module.should.forceCallbacks()) {
              module.debug('Should not allow uncheck, checkbox is already unchecked');
              return false;
            }

            if (settings.beforeUnchecked.apply(input) === false) {
              module.debug('Should not allow uncheck, beforeUnchecked cancelled');
              return false;
            }

            return true;
          },
          allowIndeterminate: function allowIndeterminate() {
            if (module.is.indeterminate() && !module.should.forceCallbacks()) {
              module.debug('Should not allow indeterminate, checkbox is already indeterminate');
              return false;
            }

            if (settings.beforeIndeterminate.apply(input) === false) {
              module.debug('Should not allow indeterminate, beforeIndeterminate cancelled');
              return false;
            }

            return true;
          },
          allowDeterminate: function allowDeterminate() {
            if (module.is.determinate() && !module.should.forceCallbacks()) {
              module.debug('Should not allow determinate, checkbox is already determinate');
              return false;
            }

            if (settings.beforeDeterminate.apply(input) === false) {
              module.debug('Should not allow determinate, beforeDeterminate cancelled');
              return false;
            }

            return true;
          },
          forceCallbacks: function forceCallbacks() {
            return module.is.initialLoad() && settings.fireOnInit;
          },
          ignoreCallbacks: function ignoreCallbacks() {
            return _initialLoad && !settings.fireOnInit;
          }
        },
        can: {
          change: function change() {
            return !($module.hasClass(className.disabled) || $module.hasClass(className.readOnly) || $input.prop('disabled') || $input.prop('readonly'));
          },
          uncheck: function uncheck() {
            return typeof settings.uncheckable === 'boolean' ? settings.uncheckable : !module.is.radio();
          }
        },
        set: {
          initialLoad: function initialLoad() {
            _initialLoad = true;
          },
          checked: function checked() {
            module.verbose('Setting class to checked');
            $module.removeClass(className.indeterminate).addClass(className.checked);

            if (module.is.radio()) {
              module.uncheckOthers();
            }

            if (!module.is.indeterminate() && module.is.checked()) {
              module.debug('Input is already checked, skipping input property change');
              return;
            }

            module.verbose('Setting state to checked', input);
            $input.prop('indeterminate', false).prop('checked', true);
            module.trigger.change();
          },
          unchecked: function unchecked() {
            module.verbose('Removing checked class');
            $module.removeClass(className.indeterminate).removeClass(className.checked);

            if (!module.is.indeterminate() && module.is.unchecked()) {
              module.debug('Input is already unchecked');
              return;
            }

            module.debug('Setting state to unchecked');
            $input.prop('indeterminate', false).prop('checked', false);
            module.trigger.change();
          },
          indeterminate: function indeterminate() {
            module.verbose('Setting class to indeterminate');
            $module.addClass(className.indeterminate);

            if (module.is.indeterminate()) {
              module.debug('Input is already indeterminate, skipping input property change');
              return;
            }

            module.debug('Setting state to indeterminate');
            $input.prop('indeterminate', true);
            module.trigger.change();
          },
          determinate: function determinate() {
            module.verbose('Removing indeterminate class');
            $module.removeClass(className.indeterminate);

            if (module.is.determinate()) {
              module.debug('Input is already determinate, skipping input property change');
              return;
            }

            module.debug('Setting state to determinate');
            $input.prop('indeterminate', false);
          },
          disabled: function disabled() {
            module.verbose('Setting class to disabled');
            $module.addClass(className.disabled);

            if (module.is.disabled()) {
              module.debug('Input is already disabled, skipping input property change');
              return;
            }

            module.debug('Setting state to disabled');
            $input.prop('disabled', 'disabled');
            module.trigger.change();
          },
          enabled: function enabled() {
            module.verbose('Removing disabled class');
            $module.removeClass(className.disabled);

            if (module.is.enabled()) {
              module.debug('Input is already enabled, skipping input property change');
              return;
            }

            module.debug('Setting state to enabled');
            $input.prop('disabled', false);
            module.trigger.change();
          },
          tabbable: function tabbable() {
            module.verbose('Adding tabindex to checkbox');

            if ($input.attr('tabindex') === undefined) {
              $input.attr('tabindex', 0);
            }
          }
        },
        remove: {
          initialLoad: function initialLoad() {
            _initialLoad = false;
          }
        },
        trigger: {
          change: function change() {
            var events = document.createEvent('HTMLEvents'),
                inputElement = $input[0];

            if (inputElement) {
              module.verbose('Triggering native change event');
              events.initEvent('change', true, false);
              inputElement.dispatchEvent(events);
            }
          }
        },
        create: {
          label: function label() {
            if ($input.prevAll(selector.label).length > 0) {
              $input.prev(selector.label).detach().insertAfter($input);
              module.debug('Moving existing label', $label);
            } else if (!module.has.label()) {
              $label = $('<label>').insertAfter($input);
              module.debug('Creating label', $label);
            }
          }
        },
        has: {
          label: function label() {
            return $label.length > 0;
          }
        },
        bind: {
          events: function events() {
            module.verbose('Attaching checkbox events');
            $module.on('click' + eventNamespace, module.event.click).on('keydown' + eventNamespace, selector.input, module.event.keydown).on('keyup' + eventNamespace, selector.input, module.event.keyup);
          }
        },
        unbind: {
          events: function events() {
            module.debug('Removing events');
            $module.off(eventNamespace);
          }
        },
        uncheckOthers: function uncheckOthers() {
          var $radios = module.get.otherRadios();
          module.debug('Unchecking other radios', $radios);
          $radios.removeClass(className.checked);
        },
        toggle: function toggle() {
          if (!module.can.change()) {
            if (!module.is.radio()) {
              module.debug('Checkbox is read-only or disabled, ignoring toggle');
            }

            return;
          }

          if (module.is.indeterminate() || module.is.unchecked()) {
            module.debug('Currently unchecked');
            module.check();
          } else if (module.is.checked() && module.can.uncheck()) {
            module.debug('Currently checked');
            module.uncheck();
          }
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                module.error(error.method, query);
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.checkbox.settings = {
    name: 'Checkbox',
    namespace: 'checkbox',
    silent: false,
    debug: false,
    verbose: true,
    performance: true,
    // delegated event context
    uncheckable: 'auto',
    fireOnInit: false,
    onChange: function onChange() {},
    beforeChecked: function beforeChecked() {},
    beforeUnchecked: function beforeUnchecked() {},
    beforeDeterminate: function beforeDeterminate() {},
    beforeIndeterminate: function beforeIndeterminate() {},
    onChecked: function onChecked() {},
    onUnchecked: function onUnchecked() {},
    onDeterminate: function onDeterminate() {},
    onIndeterminate: function onIndeterminate() {},
    onEnable: function onEnable() {},
    onDisable: function onDisable() {},
    // preserve misspelled callbacks (will be removed in 3.0)
    onEnabled: function onEnabled() {},
    onDisabled: function onDisabled() {},
    className: {
      checked: 'checked',
      indeterminate: 'indeterminate',
      disabled: 'disabled',
      hidden: 'hidden',
      radio: 'radio',
      readOnly: 'read-only'
    },
    error: {
      method: 'The method you called is not defined'
    },
    selector: {
      checkbox: '.ui.checkbox',
      label: 'label, .box',
      input: 'input[type="checkbox"], input[type="radio"]',
      link: 'a[href]'
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Dimmer
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.dimmer = function (parameters) {
    var $allModules = $(this),
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;
    $allModules.each(function () {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.dimmer.settings, parameters) : $.extend({}, $.fn.dimmer.settings),
          selector = settings.selector,
          namespace = settings.namespace,
          className = settings.className,
          error = settings.error,
          eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          moduleSelector = $allModules.selector || '',
          clickEvent = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click',
          $module = $(this),
          $dimmer,
          $dimmable,
          element = this,
          instance = $module.data(moduleNamespace),
          module;
      module = {
        preinitialize: function preinitialize() {
          if (module.is.dimmer()) {
            $dimmable = $module.parent();
            $dimmer = $module;
          } else {
            $dimmable = $module;

            if (module.has.dimmer()) {
              if (settings.dimmerName) {
                $dimmer = $dimmable.find(selector.dimmer).filter('.' + settings.dimmerName);
              } else {
                $dimmer = $dimmable.find(selector.dimmer);
              }
            } else {
              $dimmer = module.create();
            }
          }
        },
        initialize: function initialize() {
          module.debug('Initializing dimmer', settings);
          module.bind.events();
          module.set.dimmable();
          module.instantiate();
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module.data(moduleNamespace, instance);
        },
        destroy: function destroy() {
          module.verbose('Destroying previous module', $dimmer);
          module.unbind.events();
          module.remove.variation();
          $dimmable.off(eventNamespace);
        },
        bind: {
          events: function events() {
            if (settings.on == 'hover') {
              $dimmable.on('mouseenter' + eventNamespace, module.show).on('mouseleave' + eventNamespace, module.hide);
            } else if (settings.on == 'click') {
              $dimmable.on(clickEvent + eventNamespace, module.toggle);
            }

            if (module.is.page()) {
              module.debug('Setting as a page dimmer', $dimmable);
              module.set.pageDimmer();
            }

            if (module.is.closable()) {
              module.verbose('Adding dimmer close event', $dimmer);
              $dimmable.on(clickEvent + eventNamespace, selector.dimmer, module.event.click);
            }
          }
        },
        unbind: {
          events: function events() {
            $module.removeData(moduleNamespace);
            $dimmable.off(eventNamespace);
          }
        },
        event: {
          click: function click(event) {
            module.verbose('Determining if event occured on dimmer', event);

            if ($dimmer.find(event.target).length === 0 || $(event.target).is(selector.content)) {
              module.hide();
              event.stopImmediatePropagation();
            }
          }
        },
        addContent: function addContent(element) {
          var $content = $(element);
          module.debug('Add content to dimmer', $content);

          if ($content.parent()[0] !== $dimmer[0]) {
            $content.detach().appendTo($dimmer);
          }
        },
        create: function create() {
          var $element = $(settings.template.dimmer());

          if (settings.dimmerName) {
            module.debug('Creating named dimmer', settings.dimmerName);
            $element.addClass(settings.dimmerName);
          }

          $element.appendTo($dimmable);
          return $element;
        },
        show: function show(callback) {
          callback = $.isFunction(callback) ? callback : function () {};
          module.debug('Showing dimmer', $dimmer, settings);
          module.set.variation();

          if ((!module.is.dimmed() || module.is.animating()) && module.is.enabled()) {
            module.animate.show(callback);
            settings.onShow.call(element);
            settings.onChange.call(element);
          } else {
            module.debug('Dimmer is already shown or disabled');
          }
        },
        hide: function hide(callback) {
          callback = $.isFunction(callback) ? callback : function () {};

          if (module.is.dimmed() || module.is.animating()) {
            module.debug('Hiding dimmer', $dimmer);
            module.animate.hide(callback);
            settings.onHide.call(element);
            settings.onChange.call(element);
          } else {
            module.debug('Dimmer is not visible');
          }
        },
        toggle: function toggle() {
          module.verbose('Toggling dimmer visibility', $dimmer);

          if (!module.is.dimmed()) {
            module.show();
          } else {
            module.hide();
          }
        },
        animate: {
          show: function show(callback) {
            callback = $.isFunction(callback) ? callback : function () {};

            if (settings.useCSS && $.fn.transition !== undefined && $dimmer.transition('is supported')) {
              if (settings.useFlex) {
                module.debug('Using flex dimmer');
                module.remove.legacy();
              } else {
                module.debug('Using legacy non-flex dimmer');
                module.set.legacy();
              }

              if (settings.opacity !== 'auto') {
                module.set.opacity();
              }

              $dimmer.transition({
                displayType: settings.useFlex ? 'flex' : 'block',
                animation: settings.transition + ' in',
                queue: false,
                duration: module.get.duration(),
                useFailSafe: true,
                onStart: function onStart() {
                  module.set.dimmed();
                },
                onComplete: function onComplete() {
                  module.set.active();
                  callback();
                }
              });
            } else {
              module.verbose('Showing dimmer animation with javascript');
              module.set.dimmed();

              if (settings.opacity == 'auto') {
                settings.opacity = 0.8;
              }

              $dimmer.stop().css({
                opacity: 0,
                width: '100%',
                height: '100%'
              }).fadeTo(module.get.duration(), settings.opacity, function () {
                $dimmer.removeAttr('style');
                module.set.active();
                callback();
              });
            }
          },
          hide: function hide(callback) {
            callback = $.isFunction(callback) ? callback : function () {};

            if (settings.useCSS && $.fn.transition !== undefined && $dimmer.transition('is supported')) {
              module.verbose('Hiding dimmer with css');
              $dimmer.transition({
                displayType: settings.useFlex ? 'flex' : 'block',
                animation: settings.transition + ' out',
                queue: false,
                duration: module.get.duration(),
                useFailSafe: true,
                onStart: function onStart() {
                  module.remove.dimmed();
                },
                onComplete: function onComplete() {
                  module.remove.variation();
                  module.remove.active();
                  callback();
                }
              });
            } else {
              module.verbose('Hiding dimmer with javascript');
              module.remove.dimmed();
              $dimmer.stop().fadeOut(module.get.duration(), function () {
                module.remove.active();
                $dimmer.removeAttr('style');
                callback();
              });
            }
          }
        },
        get: {
          dimmer: function dimmer() {
            return $dimmer;
          },
          duration: function duration() {
            if (_typeof(settings.duration) == 'object') {
              if (module.is.active()) {
                return settings.duration.hide;
              } else {
                return settings.duration.show;
              }
            }

            return settings.duration;
          }
        },
        has: {
          dimmer: function dimmer() {
            if (settings.dimmerName) {
              return $module.find(selector.dimmer).filter('.' + settings.dimmerName).length > 0;
            } else {
              return $module.find(selector.dimmer).length > 0;
            }
          }
        },
        is: {
          active: function active() {
            return $dimmer.hasClass(className.active);
          },
          animating: function animating() {
            return $dimmer.is(':animated') || $dimmer.hasClass(className.animating);
          },
          closable: function closable() {
            if (settings.closable == 'auto') {
              if (settings.on == 'hover') {
                return false;
              }

              return true;
            }

            return settings.closable;
          },
          dimmer: function dimmer() {
            return $module.hasClass(className.dimmer);
          },
          dimmable: function dimmable() {
            return $module.hasClass(className.dimmable);
          },
          dimmed: function dimmed() {
            return $dimmable.hasClass(className.dimmed);
          },
          disabled: function disabled() {
            return $dimmable.hasClass(className.disabled);
          },
          enabled: function enabled() {
            return !module.is.disabled();
          },
          page: function page() {
            return $dimmable.is('body');
          },
          pageDimmer: function pageDimmer() {
            return $dimmer.hasClass(className.pageDimmer);
          }
        },
        can: {
          show: function show() {
            return !$dimmer.hasClass(className.disabled);
          }
        },
        set: {
          opacity: function opacity(_opacity) {
            var color = $dimmer.css('background-color'),
                colorArray = color.split(','),
                isRGB = colorArray && colorArray.length == 3,
                isRGBA = colorArray && colorArray.length == 4;
            _opacity = settings.opacity === 0 ? 0 : settings.opacity || _opacity;

            if (isRGB || isRGBA) {
              colorArray[3] = _opacity + ')';
              color = colorArray.join(',');
            } else {
              color = 'rgba(0, 0, 0, ' + _opacity + ')';
            }

            module.debug('Setting opacity to', _opacity);
            $dimmer.css('background-color', color);
          },
          legacy: function legacy() {
            $dimmer.addClass(className.legacy);
          },
          active: function active() {
            $dimmer.addClass(className.active);
          },
          dimmable: function dimmable() {
            $dimmable.addClass(className.dimmable);
          },
          dimmed: function dimmed() {
            $dimmable.addClass(className.dimmed);
          },
          pageDimmer: function pageDimmer() {
            $dimmer.addClass(className.pageDimmer);
          },
          disabled: function disabled() {
            $dimmer.addClass(className.disabled);
          },
          variation: function variation(_variation) {
            _variation = _variation || settings.variation;

            if (_variation) {
              $dimmer.addClass(_variation);
            }
          }
        },
        remove: {
          active: function active() {
            $dimmer.removeClass(className.active);
          },
          legacy: function legacy() {
            $dimmer.removeClass(className.legacy);
          },
          dimmed: function dimmed() {
            $dimmable.removeClass(className.dimmed);
          },
          disabled: function disabled() {
            $dimmer.removeClass(className.disabled);
          },
          variation: function variation(_variation2) {
            _variation2 = _variation2 || settings.variation;

            if (_variation2) {
              $dimmer.removeClass(_variation2);
            }
          }
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ($allModules.length > 1) {
              title += ' ' + '(' + $allModules.length + ')';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                module.error(error.method, query);
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };
      module.preinitialize();

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.dimmer.settings = {
    name: 'Dimmer',
    namespace: 'dimmer',
    silent: false,
    debug: false,
    verbose: false,
    performance: true,
    // whether should use flex layout
    useFlex: true,
    // name to distinguish between multiple dimmers in context
    dimmerName: false,
    // whether to add a variation type
    variation: false,
    // whether to bind close events
    closable: 'auto',
    // whether to use css animations
    useCSS: true,
    // css animation to use
    transition: 'fade',
    // event to bind to
    on: false,
    // overriding opacity value
    opacity: 'auto',
    // transition durations
    duration: {
      show: 500,
      hide: 500
    },
    onChange: function onChange() {},
    onShow: function onShow() {},
    onHide: function onHide() {},
    error: {
      method: 'The method you called is not defined.'
    },
    className: {
      active: 'active',
      animating: 'animating',
      dimmable: 'dimmable',
      dimmed: 'dimmed',
      dimmer: 'dimmer',
      disabled: 'disabled',
      hide: 'hide',
      legacy: 'legacy',
      pageDimmer: 'page',
      show: 'show'
    },
    selector: {
      dimmer: '> .ui.dimmer',
      content: '.ui.dimmer > .content, .ui.dimmer > .content > .center'
    },
    template: {
      dimmer: function dimmer() {
        return $('<div />').attr('class', 'ui dimmer');
      }
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Dropdown
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.dropdown = function (parameters) {
    var $allModules = $(this),
        $document = $(document),
        moduleSelector = $allModules.selector || '',
        hasTouch = 'ontouchstart' in document.documentElement,
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;
    $allModules.each(function (elementIndex) {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.dropdown.settings, parameters) : $.extend({}, $.fn.dropdown.settings),
          className = settings.className,
          message = settings.message,
          fields = settings.fields,
          keys = settings.keys,
          metadata = settings.metadata,
          namespace = settings.namespace,
          regExp = settings.regExp,
          selector = settings.selector,
          error = settings.error,
          templates = settings.templates,
          eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          $module = $(this),
          $context = $(settings.context),
          $text = $module.find(selector.text),
          $search = $module.find(selector.search),
          $sizer = $module.find(selector.sizer),
          $input = $module.find(selector.input),
          $icon = $module.find(selector.icon),
          $combo = $module.prev().find(selector.text).length > 0 ? $module.prev().find(selector.text) : $module.prev(),
          $menu = $module.children(selector.menu),
          $item = $menu.find(selector.item),
          activated = false,
          itemActivated = false,
          internalChange = false,
          element = this,
          instance = $module.data(moduleNamespace),
          _initialLoad2,
          pageLostFocus,
          willRefocus,
          elementNamespace,
          _id,
          _selectObserver,
          _menuObserver,
          module;

      module = {
        initialize: function initialize() {
          module.debug('Initializing dropdown', settings);

          if (module.is.alreadySetup()) {
            module.setup.reference();
          } else {
            module.setup.layout();

            if (settings.values) {
              module.change.values(settings.values);
            }

            module.refreshData();
            module.save.defaults();
            module.restore.selected();
            module.create.id();
            module.bind.events();
            module.observeChanges();
            module.instantiate();
          }
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance of dropdown', module);
          instance = module;
          $module.data(moduleNamespace, module);
        },
        destroy: function destroy() {
          module.verbose('Destroying previous dropdown', $module);
          module.remove.tabbable();
          $module.off(eventNamespace).removeData(moduleNamespace);
          $menu.off(eventNamespace);
          $document.off(elementNamespace);
          module.disconnect.menuObserver();
          module.disconnect.selectObserver();
        },
        observeChanges: function observeChanges() {
          if ('MutationObserver' in window) {
            _selectObserver = new MutationObserver(module.event.select.mutation);
            _menuObserver = new MutationObserver(module.event.menu.mutation);
            module.debug('Setting up mutation observer', _selectObserver, _menuObserver);
            module.observe.select();
            module.observe.menu();
          }
        },
        disconnect: {
          menuObserver: function menuObserver() {
            if (_menuObserver) {
              _menuObserver.disconnect();
            }
          },
          selectObserver: function selectObserver() {
            if (_selectObserver) {
              _selectObserver.disconnect();
            }
          }
        },
        observe: {
          select: function select() {
            if (module.has.input()) {
              _selectObserver.observe($module[0], {
                childList: true,
                subtree: true
              });
            }
          },
          menu: function menu() {
            if (module.has.menu()) {
              _menuObserver.observe($menu[0], {
                childList: true,
                subtree: true
              });
            }
          }
        },
        create: {
          id: function id() {
            _id = (Math.random().toString(16) + '000000000').substr(2, 8);
            elementNamespace = '.' + _id;
            module.verbose('Creating unique id for element', _id);
          },
          userChoice: function userChoice(values) {
            var $userChoices, $userChoice, isUserValue, html;
            values = values || module.get.userValues();

            if (!values) {
              return false;
            }

            values = $.isArray(values) ? values : [values];
            $.each(values, function (index, value) {
              if (module.get.item(value) === false) {
                html = settings.templates.addition(module.add.variables(message.addResult, value));
                $userChoice = $('<div />').html(html).attr('data-' + metadata.value, value).attr('data-' + metadata.text, value).addClass(className.addition).addClass(className.item);

                if (settings.hideAdditions) {
                  $userChoice.addClass(className.hidden);
                }

                $userChoices = $userChoices === undefined ? $userChoice : $userChoices.add($userChoice);
                module.verbose('Creating user choices for value', value, $userChoice);
              }
            });
            return $userChoices;
          },
          userLabels: function userLabels(value) {
            var userValues = module.get.userValues();

            if (userValues) {
              module.debug('Adding user labels', userValues);
              $.each(userValues, function (index, value) {
                module.verbose('Adding custom user value');
                module.add.label(value, value);
              });
            }
          },
          menu: function menu() {
            $menu = $('<div />').addClass(className.menu).appendTo($module);
          },
          sizer: function sizer() {
            $sizer = $('<span />').addClass(className.sizer).insertAfter($search);
          }
        },
        search: function search(query) {
          query = query !== undefined ? query : module.get.query();
          module.verbose('Searching for query', query);

          if (module.has.minCharacters(query)) {
            module.filter(query);
          } else {
            module.hide();
          }
        },
        select: {
          firstUnfiltered: function firstUnfiltered() {
            module.verbose('Selecting first non-filtered element');
            module.remove.selectedItem();
            $item.not(selector.unselectable).not(selector.addition + selector.hidden).eq(0).addClass(className.selected);
          },
          nextAvailable: function nextAvailable($selected) {
            $selected = $selected.eq(0);
            var $nextAvailable = $selected.nextAll(selector.item).not(selector.unselectable).eq(0),
                $prevAvailable = $selected.prevAll(selector.item).not(selector.unselectable).eq(0),
                hasNext = $nextAvailable.length > 0;

            if (hasNext) {
              module.verbose('Moving selection to', $nextAvailable);
              $nextAvailable.addClass(className.selected);
            } else {
              module.verbose('Moving selection to', $prevAvailable);
              $prevAvailable.addClass(className.selected);
            }
          }
        },
        setup: {
          api: function api() {
            var apiSettings = {
              debug: settings.debug,
              urlData: {
                value: module.get.value(),
                query: module.get.query()
              },
              on: false
            };
            module.verbose('First request, initializing API');
            $module.api(apiSettings);
          },
          layout: function layout() {
            if ($module.is('select')) {
              module.setup.select();
              module.setup.returnedObject();
            }

            if (!module.has.menu()) {
              module.create.menu();
            }

            if (module.is.search() && !module.has.search()) {
              module.verbose('Adding search input');
              $search = $('<input />').addClass(className.search).prop('autocomplete', 'off').insertBefore($text);
            }

            if (module.is.multiple() && module.is.searchSelection() && !module.has.sizer()) {
              module.create.sizer();
            }

            if (settings.allowTab) {
              module.set.tabbable();
            }
          },
          select: function select() {
            var selectValues = module.get.selectValues();
            module.debug('Dropdown initialized on a select', selectValues);

            if ($module.is('select')) {
              $input = $module;
            } // see if select is placed correctly already


            if ($input.parent(selector.dropdown).length > 0) {
              module.debug('UI dropdown already exists. Creating dropdown menu only');
              $module = $input.closest(selector.dropdown);

              if (!module.has.menu()) {
                module.create.menu();
              }

              $menu = $module.children(selector.menu);
              module.setup.menu(selectValues);
            } else {
              module.debug('Creating entire dropdown from select');
              $module = $('<div />').attr('class', $input.attr('class')).addClass(className.selection).addClass(className.dropdown).html(templates.dropdown(selectValues)).insertBefore($input);

              if ($input.hasClass(className.multiple) && $input.prop('multiple') === false) {
                module.error(error.missingMultiple);
                $input.prop('multiple', true);
              }

              if ($input.is('[multiple]')) {
                module.set.multiple();
              }

              if ($input.prop('disabled')) {
                module.debug('Disabling dropdown');
                $module.addClass(className.disabled);
              }

              $input.removeAttr('class').detach().prependTo($module);
            }

            module.refresh();
          },
          menu: function menu(values) {
            $menu.html(templates.menu(values, fields));
            $item = $menu.find(selector.item);
          },
          reference: function reference() {
            module.debug('Dropdown behavior was called on select, replacing with closest dropdown'); // replace module reference

            $module = $module.parent(selector.dropdown);
            instance = $module.data(moduleNamespace);
            element = $module.get(0);
            module.refresh();
            module.setup.returnedObject();
          },
          returnedObject: function returnedObject() {
            var $firstModules = $allModules.slice(0, elementIndex),
                $lastModules = $allModules.slice(elementIndex + 1); // adjust all modules to use correct reference

            $allModules = $firstModules.add($module).add($lastModules);
          }
        },
        refresh: function refresh() {
          module.refreshSelectors();
          module.refreshData();
        },
        refreshItems: function refreshItems() {
          $item = $menu.find(selector.item);
        },
        refreshSelectors: function refreshSelectors() {
          module.verbose('Refreshing selector cache');
          $text = $module.find(selector.text);
          $search = $module.find(selector.search);
          $input = $module.find(selector.input);
          $icon = $module.find(selector.icon);
          $combo = $module.prev().find(selector.text).length > 0 ? $module.prev().find(selector.text) : $module.prev();
          $menu = $module.children(selector.menu);
          $item = $menu.find(selector.item);
        },
        refreshData: function refreshData() {
          module.verbose('Refreshing cached metadata');
          $item.removeData(metadata.text).removeData(metadata.value);
        },
        clearData: function clearData() {
          module.verbose('Clearing metadata');
          $item.removeData(metadata.text).removeData(metadata.value);
          $module.removeData(metadata.defaultText).removeData(metadata.defaultValue).removeData(metadata.placeholderText);
        },
        toggle: function toggle() {
          module.verbose('Toggling menu visibility');

          if (!module.is.active()) {
            module.show();
          } else {
            module.hide();
          }
        },
        show: function show(callback) {
          callback = $.isFunction(callback) ? callback : function () {};

          if (!module.can.show() && module.is.remote()) {
            module.debug('No API results retrieved, searching before show');
            module.queryRemote(module.get.query(), module.show);
          }

          if (module.can.show() && !module.is.active()) {
            module.debug('Showing dropdown');

            if (module.has.message() && !(module.has.maxSelections() || module.has.allResultsFiltered())) {
              module.remove.message();
            }

            if (module.is.allFiltered()) {
              return true;
            }

            if (settings.onShow.call(element) !== false) {
              module.animate.show(function () {
                if (module.can.click()) {
                  module.bind.intent();
                }

                if (module.has.menuSearch()) {
                  module.focusSearch();
                }

                module.set.visible();
                callback.call(element);
              });
            }
          }
        },
        hide: function hide(callback) {
          callback = $.isFunction(callback) ? callback : function () {};

          if (module.is.active() && !module.is.animatingOutward()) {
            module.debug('Hiding dropdown');

            if (settings.onHide.call(element) !== false) {
              module.animate.hide(function () {
                module.remove.visible();
                callback.call(element);
              });
            }
          }
        },
        hideOthers: function hideOthers() {
          module.verbose('Finding other dropdowns to hide');
          $allModules.not($module).has(selector.menu + '.' + className.visible).dropdown('hide');
        },
        hideMenu: function hideMenu() {
          module.verbose('Hiding menu  instantaneously');
          module.remove.active();
          module.remove.visible();
          $menu.transition('hide');
        },
        hideSubMenus: function hideSubMenus() {
          var $subMenus = $menu.children(selector.item).find(selector.menu);
          module.verbose('Hiding sub menus', $subMenus);
          $subMenus.transition('hide');
        },
        bind: {
          events: function events() {
            if (hasTouch) {
              module.bind.touchEvents();
            }

            module.bind.keyboardEvents();
            module.bind.inputEvents();
            module.bind.mouseEvents();
          },
          touchEvents: function touchEvents() {
            module.debug('Touch device detected binding additional touch events');

            if (module.is.searchSelection()) {// do nothing special yet
            } else if (module.is.single()) {
              $module.on('touchstart' + eventNamespace, module.event.test.toggle);
            }

            $menu.on('touchstart' + eventNamespace, selector.item, module.event.item.mouseenter);
          },
          keyboardEvents: function keyboardEvents() {
            module.verbose('Binding keyboard events');
            $module.on('keydown' + eventNamespace, module.event.keydown);

            if (module.has.search()) {
              $module.on(module.get.inputEvent() + eventNamespace, selector.search, module.event.input);
            }

            if (module.is.multiple()) {
              $document.on('keydown' + elementNamespace, module.event.document.keydown);
            }
          },
          inputEvents: function inputEvents() {
            module.verbose('Binding input change events');
            $module.on('change' + eventNamespace, selector.input, module.event.change);
          },
          mouseEvents: function mouseEvents() {
            module.verbose('Binding mouse events');

            if (module.is.multiple()) {
              $module.on('click' + eventNamespace, selector.label, module.event.label.click).on('click' + eventNamespace, selector.remove, module.event.remove.click);
            }

            if (module.is.searchSelection()) {
              $module.on('mousedown' + eventNamespace, module.event.mousedown).on('mouseup' + eventNamespace, module.event.mouseup).on('mousedown' + eventNamespace, selector.menu, module.event.menu.mousedown).on('mouseup' + eventNamespace, selector.menu, module.event.menu.mouseup).on('click' + eventNamespace, selector.icon, module.event.icon.click).on('focus' + eventNamespace, selector.search, module.event.search.focus).on('click' + eventNamespace, selector.search, module.event.search.focus).on('blur' + eventNamespace, selector.search, module.event.search.blur).on('click' + eventNamespace, selector.text, module.event.text.focus);

              if (module.is.multiple()) {
                $module.on('click' + eventNamespace, module.event.click);
              }
            } else {
              if (settings.on == 'click') {
                $module.on('click' + eventNamespace, module.event.test.toggle);
              } else if (settings.on == 'hover') {
                $module.on('mouseenter' + eventNamespace, module.delay.show).on('mouseleave' + eventNamespace, module.delay.hide);
              } else {
                $module.on(settings.on + eventNamespace, module.toggle);
              }

              $module.on('click' + eventNamespace, selector.icon, module.event.icon.click).on('mousedown' + eventNamespace, module.event.mousedown).on('mouseup' + eventNamespace, module.event.mouseup).on('focus' + eventNamespace, module.event.focus);

              if (module.has.menuSearch()) {
                $module.on('blur' + eventNamespace, selector.search, module.event.search.blur);
              } else {
                $module.on('blur' + eventNamespace, module.event.blur);
              }
            }

            $menu.on('mouseenter' + eventNamespace, selector.item, module.event.item.mouseenter).on('mouseleave' + eventNamespace, selector.item, module.event.item.mouseleave).on('click' + eventNamespace, selector.item, module.event.item.click);
          },
          intent: function intent() {
            module.verbose('Binding hide intent event to document');

            if (hasTouch) {
              $document.on('touchstart' + elementNamespace, module.event.test.touch).on('touchmove' + elementNamespace, module.event.test.touch);
            }

            $document.on('click' + elementNamespace, module.event.test.hide);
          }
        },
        unbind: {
          intent: function intent() {
            module.verbose('Removing hide intent event from document');

            if (hasTouch) {
              $document.off('touchstart' + elementNamespace).off('touchmove' + elementNamespace);
            }

            $document.off('click' + elementNamespace);
          }
        },
        filter: function filter(query) {
          var searchTerm = query !== undefined ? query : module.get.query(),
              afterFiltered = function afterFiltered() {
            if (module.is.multiple()) {
              module.filterActive();
            }

            if (query || !query && module.get.activeItem().length == 0) {
              module.select.firstUnfiltered();
            }

            if (module.has.allResultsFiltered()) {
              if (settings.onNoResults.call(element, searchTerm)) {
                if (settings.allowAdditions) {
                  if (settings.hideAdditions) {
                    module.verbose('User addition with no menu, setting empty style');
                    module.set.empty();
                    module.hideMenu();
                  }
                } else {
                  module.verbose('All items filtered, showing message', searchTerm);
                  module.add.message(message.noResults);
                }
              } else {
                module.verbose('All items filtered, hiding dropdown', searchTerm);
                module.hideMenu();
              }
            } else {
              module.remove.empty();
              module.remove.message();
            }

            if (settings.allowAdditions) {
              module.add.userSuggestion(query);
            }

            if (module.is.searchSelection() && module.can.show() && module.is.focusedOnSearch()) {
              module.show();
            }
          };

          if (settings.useLabels && module.has.maxSelections()) {
            return;
          }

          if (settings.apiSettings) {
            if (module.can.useAPI()) {
              module.queryRemote(searchTerm, function () {
                if (settings.filterRemoteData) {
                  module.filterItems(searchTerm);
                }

                afterFiltered();
              });
            } else {
              module.error(error.noAPI);
            }
          } else {
            module.filterItems(searchTerm);
            afterFiltered();
          }
        },
        queryRemote: function queryRemote(query, callback) {
          var apiSettings = {
            errorDuration: false,
            cache: 'local',
            throttle: settings.throttle,
            urlData: {
              query: query
            },
            onError: function onError() {
              module.add.message(message.serverError);
              callback();
            },
            onFailure: function onFailure() {
              module.add.message(message.serverError);
              callback();
            },
            onSuccess: function onSuccess(response) {
              var values = response[fields.remoteValues],
                  hasRemoteValues = $.isArray(values) && values.length > 0;

              if (hasRemoteValues) {
                module.remove.message();
                module.setup.menu({
                  values: response[fields.remoteValues]
                });
              } else {
                module.add.message(message.noResults);
              }

              callback();
            }
          };

          if (!$module.api('get request')) {
            module.setup.api();
          }

          apiSettings = $.extend(true, {}, apiSettings, settings.apiSettings);
          $module.api('setting', apiSettings).api('query');
        },
        filterItems: function filterItems(query) {
          var searchTerm = query !== undefined ? query : module.get.query(),
              results = null,
              escapedTerm = module.escape.string(searchTerm),
              beginsWithRegExp = new RegExp('^' + escapedTerm, 'igm'); // avoid loop if we're matching nothing

          if (module.has.query()) {
            results = [];
            module.verbose('Searching for matching values', searchTerm);
            $item.each(function () {
              var $choice = $(this),
                  text,
                  value;

              if (settings.match == 'both' || settings.match == 'text') {
                text = String(module.get.choiceText($choice, false));

                if (text.search(beginsWithRegExp) !== -1) {
                  results.push(this);
                  return true;
                } else if (settings.fullTextSearch === 'exact' && module.exactSearch(searchTerm, text)) {
                  results.push(this);
                  return true;
                } else if (settings.fullTextSearch === true && module.fuzzySearch(searchTerm, text)) {
                  results.push(this);
                  return true;
                }
              }

              if (settings.match == 'both' || settings.match == 'value') {
                value = String(module.get.choiceValue($choice, text));

                if (value.search(beginsWithRegExp) !== -1) {
                  results.push(this);
                  return true;
                } else if (settings.fullTextSearch === 'exact' && module.exactSearch(searchTerm, value)) {
                  results.push(this);
                  return true;
                } else if (settings.fullTextSearch === true && module.fuzzySearch(searchTerm, value)) {
                  results.push(this);
                  return true;
                }
              }
            });
          }

          module.debug('Showing only matched items', searchTerm);
          module.remove.filteredItem();

          if (results) {
            $item.not(results).addClass(className.filtered);
          }
        },
        fuzzySearch: function fuzzySearch(query, term) {
          var termLength = term.length,
              queryLength = query.length;
          query = query.toLowerCase();
          term = term.toLowerCase();

          if (queryLength > termLength) {
            return false;
          }

          if (queryLength === termLength) {
            return query === term;
          }

          search: for (var characterIndex = 0, nextCharacterIndex = 0; characterIndex < queryLength; characterIndex++) {
            var queryCharacter = query.charCodeAt(characterIndex);

            while (nextCharacterIndex < termLength) {
              if (term.charCodeAt(nextCharacterIndex++) === queryCharacter) {
                continue search;
              }
            }

            return false;
          }

          return true;
        },
        exactSearch: function exactSearch(query, term) {
          query = query.toLowerCase();
          term = term.toLowerCase();

          if (term.indexOf(query) > -1) {
            return true;
          }

          return false;
        },
        filterActive: function filterActive() {
          if (settings.useLabels) {
            $item.filter('.' + className.active).addClass(className.filtered);
          }
        },
        focusSearch: function focusSearch(skipHandler) {
          if (module.has.search() && !module.is.focusedOnSearch()) {
            if (skipHandler) {
              $module.off('focus' + eventNamespace, selector.search);
              $search.focus();
              $module.on('focus' + eventNamespace, selector.search, module.event.search.focus);
            } else {
              $search.focus();
            }
          }
        },
        forceSelection: function forceSelection() {
          var $currentlySelected = $item.not(className.filtered).filter('.' + className.selected).eq(0),
              $activeItem = $item.not(className.filtered).filter('.' + className.active).eq(0),
              $selectedItem = $currentlySelected.length > 0 ? $currentlySelected : $activeItem,
              hasSelected = $selectedItem.length > 0;

          if (hasSelected && !module.is.multiple()) {
            module.debug('Forcing partial selection to selected item', $selectedItem);
            module.event.item.click.call($selectedItem, {}, true);
            return;
          } else {
            if (settings.allowAdditions) {
              module.set.selected(module.get.query());
              module.remove.searchTerm();
            } else {
              module.remove.searchTerm();
            }
          }
        },
        change: {
          values: function values(_values) {
            if (!settings.allowAdditions) {
              module.clear();
            }

            module.debug('Creating dropdown with specified values', _values);
            module.setup.menu({
              values: _values
            });
            $.each(_values, function (index, item) {
              if (item.selected == true) {
                module.debug('Setting initial selection to', item.value);
                module.set.selected(item.value);
                return true;
              }
            });
          }
        },
        event: {
          change: function change() {
            if (!internalChange) {
              module.debug('Input changed, updating selection');
              module.set.selected();
            }
          },
          focus: function focus() {
            if (settings.showOnFocus && !activated && module.is.hidden() && !pageLostFocus) {
              module.show();
            }
          },
          blur: function blur(event) {
            pageLostFocus = document.activeElement === this;

            if (!activated && !pageLostFocus) {
              module.remove.activeLabel();
              module.hide();
            }
          },
          mousedown: function mousedown() {
            if (module.is.searchSelection()) {
              // prevent menu hiding on immediate re-focus
              willRefocus = true;
            } else {
              // prevents focus callback from occurring on mousedown
              activated = true;
            }
          },
          mouseup: function mouseup() {
            if (module.is.searchSelection()) {
              // prevent menu hiding on immediate re-focus
              willRefocus = false;
            } else {
              activated = false;
            }
          },
          click: function click(event) {
            var $target = $(event.target); // focus search

            if ($target.is($module)) {
              if (!module.is.focusedOnSearch()) {
                module.focusSearch();
              } else {
                module.show();
              }
            }
          },
          search: {
            focus: function focus() {
              activated = true;

              if (module.is.multiple()) {
                module.remove.activeLabel();
              }

              if (settings.showOnFocus) {
                module.search();
              }
            },
            blur: function blur(event) {
              pageLostFocus = document.activeElement === this;

              if (module.is.searchSelection() && !willRefocus) {
                if (!itemActivated && !pageLostFocus) {
                  if (settings.forceSelection) {
                    module.forceSelection();
                  }

                  module.hide();
                }
              }

              willRefocus = false;
            }
          },
          icon: {
            click: function click(event) {
              if ($icon.hasClass(className.clear)) {
                module.clear();
              } else if (module.can.click()) {
                module.toggle();
              }
            }
          },
          text: {
            focus: function focus(event) {
              activated = true;
              module.focusSearch();
            }
          },
          input: function input(event) {
            if (module.is.multiple() || module.is.searchSelection()) {
              module.set.filtered();
            }

            clearTimeout(module.timer);
            module.timer = setTimeout(module.search, settings.delay.search);
          },
          label: {
            click: function click(event) {
              var $label = $(this),
                  $labels = $module.find(selector.label),
                  $activeLabels = $labels.filter('.' + className.active),
                  $nextActive = $label.nextAll('.' + className.active),
                  $prevActive = $label.prevAll('.' + className.active),
                  $range = $nextActive.length > 0 ? $label.nextUntil($nextActive).add($activeLabels).add($label) : $label.prevUntil($prevActive).add($activeLabels).add($label);

              if (event.shiftKey) {
                $activeLabels.removeClass(className.active);
                $range.addClass(className.active);
              } else if (event.ctrlKey) {
                $label.toggleClass(className.active);
              } else {
                $activeLabels.removeClass(className.active);
                $label.addClass(className.active);
              }

              settings.onLabelSelect.apply(this, $labels.filter('.' + className.active));
            }
          },
          remove: {
            click: function click() {
              var $label = $(this).parent();

              if ($label.hasClass(className.active)) {
                // remove all selected labels
                module.remove.activeLabels();
              } else {
                // remove this label only
                module.remove.activeLabels($label);
              }
            }
          },
          test: {
            toggle: function toggle(event) {
              var toggleBehavior = module.is.multiple() ? module.show : module.toggle;

              if (module.is.bubbledLabelClick(event) || module.is.bubbledIconClick(event)) {
                return;
              }

              if (module.determine.eventOnElement(event, toggleBehavior)) {
                event.preventDefault();
              }
            },
            touch: function touch(event) {
              module.determine.eventOnElement(event, function () {
                if (event.type == 'touchstart') {
                  module.timer = setTimeout(function () {
                    module.hide();
                  }, settings.delay.touch);
                } else if (event.type == 'touchmove') {
                  clearTimeout(module.timer);
                }
              });
              event.stopPropagation();
            },
            hide: function hide(event) {
              module.determine.eventInModule(event, module.hide);
            }
          },
          select: {
            mutation: function mutation(mutations) {
              module.debug('<select> modified, recreating menu');
              var isSelectMutation = false;
              $.each(mutations, function (index, mutation) {
                if ($(mutation.target).is('select') || $(mutation.addedNodes).is('select')) {
                  isSelectMutation = true;
                  return true;
                }
              });

              if (isSelectMutation) {
                module.disconnect.selectObserver();
                module.refresh();
                module.setup.select();
                module.set.selected();
                module.observe.select();
              }
            }
          },
          menu: {
            mutation: function mutation(mutations) {
              var mutation = mutations[0],
                  $addedNode = mutation.addedNodes ? $(mutation.addedNodes[0]) : $(false),
                  $removedNode = mutation.removedNodes ? $(mutation.removedNodes[0]) : $(false),
                  $changedNodes = $addedNode.add($removedNode),
                  isUserAddition = $changedNodes.is(selector.addition) || $changedNodes.closest(selector.addition).length > 0,
                  isMessage = $changedNodes.is(selector.message) || $changedNodes.closest(selector.message).length > 0;

              if (isUserAddition || isMessage) {
                module.debug('Updating item selector cache');
                module.refreshItems();
              } else {
                module.debug('Menu modified, updating selector cache');
                module.refresh();
              }
            },
            mousedown: function mousedown() {
              itemActivated = true;
            },
            mouseup: function mouseup() {
              itemActivated = false;
            }
          },
          item: {
            mouseenter: function mouseenter(event) {
              var $target = $(event.target),
                  $item = $(this),
                  $subMenu = $item.children(selector.menu),
                  $otherMenus = $item.siblings(selector.item).children(selector.menu),
                  hasSubMenu = $subMenu.length > 0,
                  isBubbledEvent = $subMenu.find($target).length > 0;

              if (!isBubbledEvent && hasSubMenu) {
                clearTimeout(module.itemTimer);
                module.itemTimer = setTimeout(function () {
                  module.verbose('Showing sub-menu', $subMenu);
                  $.each($otherMenus, function () {
                    module.animate.hide(false, $(this));
                  });
                  module.animate.show(false, $subMenu);
                }, settings.delay.show);
                event.preventDefault();
              }
            },
            mouseleave: function mouseleave(event) {
              var $subMenu = $(this).children(selector.menu);

              if ($subMenu.length > 0) {
                clearTimeout(module.itemTimer);
                module.itemTimer = setTimeout(function () {
                  module.verbose('Hiding sub-menu', $subMenu);
                  module.animate.hide(false, $subMenu);
                }, settings.delay.hide);
              }
            },
            click: function click(event, skipRefocus) {
              var $choice = $(this),
                  $target = event ? $(event.target) : $(''),
                  $subMenu = $choice.find(selector.menu),
                  text = module.get.choiceText($choice),
                  value = module.get.choiceValue($choice, text),
                  hasSubMenu = $subMenu.length > 0,
                  isBubbledEvent = $subMenu.find($target).length > 0; // prevents IE11 bug where menu receives focus even though `tabindex=-1`

              if (module.has.menuSearch()) {
                $(document.activeElement).blur();
              }

              if (!isBubbledEvent && (!hasSubMenu || settings.allowCategorySelection)) {
                if (module.is.searchSelection()) {
                  if (settings.allowAdditions) {
                    module.remove.userAddition();
                  }

                  module.remove.searchTerm();

                  if (!module.is.focusedOnSearch() && !(skipRefocus == true)) {
                    module.focusSearch(true);
                  }
                }

                if (!settings.useLabels) {
                  module.remove.filteredItem();
                  module.set.scrollPosition($choice);
                }

                module.determine.selectAction.call(this, text, value);
              }
            }
          },
          document: {
            // label selection should occur even when element has no focus
            keydown: function keydown(event) {
              var pressedKey = event.which,
                  isShortcutKey = module.is.inObject(pressedKey, keys);

              if (isShortcutKey) {
                var $label = $module.find(selector.label),
                    $activeLabel = $label.filter('.' + className.active),
                    activeValue = $activeLabel.data(metadata.value),
                    labelIndex = $label.index($activeLabel),
                    labelCount = $label.length,
                    hasActiveLabel = $activeLabel.length > 0,
                    hasMultipleActive = $activeLabel.length > 1,
                    isFirstLabel = labelIndex === 0,
                    isLastLabel = labelIndex + 1 == labelCount,
                    isSearch = module.is.searchSelection(),
                    isFocusedOnSearch = module.is.focusedOnSearch(),
                    isFocused = module.is.focused(),
                    caretAtStart = isFocusedOnSearch && module.get.caretPosition() === 0,
                    $nextLabel;

                if (isSearch && !hasActiveLabel && !isFocusedOnSearch) {
                  return;
                }

                if (pressedKey == keys.leftArrow) {
                  // activate previous label
                  if ((isFocused || caretAtStart) && !hasActiveLabel) {
                    module.verbose('Selecting previous label');
                    $label.last().addClass(className.active);
                  } else if (hasActiveLabel) {
                    if (!event.shiftKey) {
                      module.verbose('Selecting previous label');
                      $label.removeClass(className.active);
                    } else {
                      module.verbose('Adding previous label to selection');
                    }

                    if (isFirstLabel && !hasMultipleActive) {
                      $activeLabel.addClass(className.active);
                    } else {
                      $activeLabel.prev(selector.siblingLabel).addClass(className.active).end();
                    }

                    event.preventDefault();
                  }
                } else if (pressedKey == keys.rightArrow) {
                  // activate first label
                  if (isFocused && !hasActiveLabel) {
                    $label.first().addClass(className.active);
                  } // activate next label


                  if (hasActiveLabel) {
                    if (!event.shiftKey) {
                      module.verbose('Selecting next label');
                      $label.removeClass(className.active);
                    } else {
                      module.verbose('Adding next label to selection');
                    }

                    if (isLastLabel) {
                      if (isSearch) {
                        if (!isFocusedOnSearch) {
                          module.focusSearch();
                        } else {
                          $label.removeClass(className.active);
                        }
                      } else if (hasMultipleActive) {
                        $activeLabel.next(selector.siblingLabel).addClass(className.active);
                      } else {
                        $activeLabel.addClass(className.active);
                      }
                    } else {
                      $activeLabel.next(selector.siblingLabel).addClass(className.active);
                    }

                    event.preventDefault();
                  }
                } else if (pressedKey == keys.deleteKey || pressedKey == keys.backspace) {
                  if (hasActiveLabel) {
                    module.verbose('Removing active labels');

                    if (isLastLabel) {
                      if (isSearch && !isFocusedOnSearch) {
                        module.focusSearch();
                      }
                    }

                    $activeLabel.last().next(selector.siblingLabel).addClass(className.active);
                    module.remove.activeLabels($activeLabel);
                    event.preventDefault();
                  } else if (caretAtStart && !hasActiveLabel && pressedKey == keys.backspace) {
                    module.verbose('Removing last label on input backspace');
                    $activeLabel = $label.last().addClass(className.active);
                    module.remove.activeLabels($activeLabel);
                  }
                } else {
                  $activeLabel.removeClass(className.active);
                }
              }
            }
          },
          keydown: function keydown(event) {
            var pressedKey = event.which,
                isShortcutKey = module.is.inObject(pressedKey, keys);

            if (isShortcutKey) {
              var $currentlySelected = $item.not(selector.unselectable).filter('.' + className.selected).eq(0),
                  $activeItem = $menu.children('.' + className.active).eq(0),
                  $selectedItem = $currentlySelected.length > 0 ? $currentlySelected : $activeItem,
                  $visibleItems = $selectedItem.length > 0 ? $selectedItem.siblings(':not(.' + className.filtered + ')').addBack() : $menu.children(':not(.' + className.filtered + ')'),
                  $subMenu = $selectedItem.children(selector.menu),
                  $parentMenu = $selectedItem.closest(selector.menu),
                  inVisibleMenu = $parentMenu.hasClass(className.visible) || $parentMenu.hasClass(className.animating) || $parentMenu.parent(selector.menu).length > 0,
                  hasSubMenu = $subMenu.length > 0,
                  hasSelectedItem = $selectedItem.length > 0,
                  selectedIsSelectable = $selectedItem.not(selector.unselectable).length > 0,
                  delimiterPressed = pressedKey == keys.delimiter && settings.allowAdditions && module.is.multiple(),
                  isAdditionWithoutMenu = settings.allowAdditions && settings.hideAdditions && (pressedKey == keys.enter || delimiterPressed) && selectedIsSelectable,
                  $nextItem,
                  isSubMenuItem,
                  newIndex; // allow selection with menu closed

              if (isAdditionWithoutMenu) {
                module.verbose('Selecting item from keyboard shortcut', $selectedItem);
                module.event.item.click.call($selectedItem, event);

                if (module.is.searchSelection()) {
                  module.remove.searchTerm();
                }
              } // visible menu keyboard shortcuts


              if (module.is.visible()) {
                // enter (select or open sub-menu)
                if (pressedKey == keys.enter || delimiterPressed) {
                  if (pressedKey == keys.enter && hasSelectedItem && hasSubMenu && !settings.allowCategorySelection) {
                    module.verbose('Pressed enter on unselectable category, opening sub menu');
                    pressedKey = keys.rightArrow;
                  } else if (selectedIsSelectable) {
                    module.verbose('Selecting item from keyboard shortcut', $selectedItem);
                    module.event.item.click.call($selectedItem, event);

                    if (module.is.searchSelection()) {
                      module.remove.searchTerm();
                    }
                  }

                  event.preventDefault();
                } // sub-menu actions


                if (hasSelectedItem) {
                  if (pressedKey == keys.leftArrow) {
                    isSubMenuItem = $parentMenu[0] !== $menu[0];

                    if (isSubMenuItem) {
                      module.verbose('Left key pressed, closing sub-menu');
                      module.animate.hide(false, $parentMenu);
                      $selectedItem.removeClass(className.selected);
                      $parentMenu.closest(selector.item).addClass(className.selected);
                      event.preventDefault();
                    }
                  } // right arrow (show sub-menu)


                  if (pressedKey == keys.rightArrow) {
                    if (hasSubMenu) {
                      module.verbose('Right key pressed, opening sub-menu');
                      module.animate.show(false, $subMenu);
                      $selectedItem.removeClass(className.selected);
                      $subMenu.find(selector.item).eq(0).addClass(className.selected);
                      event.preventDefault();
                    }
                  }
                } // up arrow (traverse menu up)


                if (pressedKey == keys.upArrow) {
                  $nextItem = hasSelectedItem && inVisibleMenu ? $selectedItem.prevAll(selector.item + ':not(' + selector.unselectable + ')').eq(0) : $item.eq(0);

                  if ($visibleItems.index($nextItem) < 0) {
                    module.verbose('Up key pressed but reached top of current menu');
                    event.preventDefault();
                    return;
                  } else {
                    module.verbose('Up key pressed, changing active item');
                    $selectedItem.removeClass(className.selected);
                    $nextItem.addClass(className.selected);
                    module.set.scrollPosition($nextItem);

                    if (settings.selectOnKeydown && module.is.single()) {
                      module.set.selectedItem($nextItem);
                    }
                  }

                  event.preventDefault();
                } // down arrow (traverse menu down)


                if (pressedKey == keys.downArrow) {
                  $nextItem = hasSelectedItem && inVisibleMenu ? $nextItem = $selectedItem.nextAll(selector.item + ':not(' + selector.unselectable + ')').eq(0) : $item.eq(0);

                  if ($nextItem.length === 0) {
                    module.verbose('Down key pressed but reached bottom of current menu');
                    event.preventDefault();
                    return;
                  } else {
                    module.verbose('Down key pressed, changing active item');
                    $item.removeClass(className.selected);
                    $nextItem.addClass(className.selected);
                    module.set.scrollPosition($nextItem);

                    if (settings.selectOnKeydown && module.is.single()) {
                      module.set.selectedItem($nextItem);
                    }
                  }

                  event.preventDefault();
                } // page down (show next page)


                if (pressedKey == keys.pageUp) {
                  module.scrollPage('up');
                  event.preventDefault();
                }

                if (pressedKey == keys.pageDown) {
                  module.scrollPage('down');
                  event.preventDefault();
                } // escape (close menu)


                if (pressedKey == keys.escape) {
                  module.verbose('Escape key pressed, closing dropdown');
                  module.hide();
                }
              } else {
                // delimiter key
                if (delimiterPressed) {
                  event.preventDefault();
                } // down arrow (open menu)


                if (pressedKey == keys.downArrow && !module.is.visible()) {
                  module.verbose('Down key pressed, showing dropdown');
                  module.show();
                  event.preventDefault();
                }
              }
            } else {
              if (!module.has.search()) {
                module.set.selectedLetter(String.fromCharCode(pressedKey));
              }
            }
          }
        },
        trigger: {
          change: function change() {
            var events = document.createEvent('HTMLEvents'),
                inputElement = $input[0];

            if (inputElement) {
              module.verbose('Triggering native change event');
              events.initEvent('change', true, false);
              inputElement.dispatchEvent(events);
            }
          }
        },
        determine: {
          selectAction: function selectAction(text, value) {
            module.verbose('Determining action', settings.action);

            if ($.isFunction(module.action[settings.action])) {
              module.verbose('Triggering preset action', settings.action, text, value);
              module.action[settings.action].call(element, text, value, this);
            } else if ($.isFunction(settings.action)) {
              module.verbose('Triggering user action', settings.action, text, value);
              settings.action.call(element, text, value, this);
            } else {
              module.error(error.action, settings.action);
            }
          },
          eventInModule: function eventInModule(event, callback) {
            var $target = $(event.target),
                inDocument = $target.closest(document.documentElement).length > 0,
                inModule = $target.closest($module).length > 0;
            callback = $.isFunction(callback) ? callback : function () {};

            if (inDocument && !inModule) {
              module.verbose('Triggering event', callback);
              callback();
              return true;
            } else {
              module.verbose('Event occurred in dropdown, canceling callback');
              return false;
            }
          },
          eventOnElement: function eventOnElement(event, callback) {
            var $target = $(event.target),
                $label = $target.closest(selector.siblingLabel),
                inVisibleDOM = document.body.contains(event.target),
                notOnLabel = $module.find($label).length === 0,
                notInMenu = $target.closest($menu).length === 0;
            callback = $.isFunction(callback) ? callback : function () {};

            if (inVisibleDOM && notOnLabel && notInMenu) {
              module.verbose('Triggering event', callback);
              callback();
              return true;
            } else {
              module.verbose('Event occurred in dropdown menu, canceling callback');
              return false;
            }
          }
        },
        action: {
          nothing: function nothing() {},
          activate: function activate(text, value, element) {
            value = value !== undefined ? value : text;

            if (module.can.activate($(element))) {
              module.set.selected(value, $(element));

              if (module.is.multiple() && !module.is.allFiltered()) {
                return;
              } else {
                module.hideAndClear();
              }
            }
          },
          select: function select(text, value, element) {
            value = value !== undefined ? value : text;

            if (module.can.activate($(element))) {
              module.set.value(value, text, $(element));

              if (module.is.multiple() && !module.is.allFiltered()) {
                return;
              } else {
                module.hideAndClear();
              }
            }
          },
          combo: function combo(text, value, element) {
            value = value !== undefined ? value : text;
            module.set.selected(value, $(element));
            module.hideAndClear();
          },
          hide: function hide(text, value, element) {
            module.set.value(value, text, $(element));
            module.hideAndClear();
          }
        },
        get: {
          id: function id() {
            return _id;
          },
          defaultText: function defaultText() {
            return $module.data(metadata.defaultText);
          },
          defaultValue: function defaultValue() {
            return $module.data(metadata.defaultValue);
          },
          placeholderText: function placeholderText() {
            if (settings.placeholder != 'auto' && typeof settings.placeholder == 'string') {
              return settings.placeholder;
            }

            return $module.data(metadata.placeholderText) || '';
          },
          text: function text() {
            return $text.text();
          },
          query: function query() {
            return $.trim($search.val());
          },
          searchWidth: function searchWidth(value) {
            value = value !== undefined ? value : $search.val();
            $sizer.text(value); // prevent rounding issues

            return Math.ceil($sizer.width() + 1);
          },
          selectionCount: function selectionCount() {
            var values = module.get.values(),
                count;
            count = module.is.multiple() ? $.isArray(values) ? values.length : 0 : module.get.value() !== '' ? 1 : 0;
            return count;
          },
          transition: function transition($subMenu) {
            return settings.transition == 'auto' ? module.is.upward($subMenu) ? 'slide up' : 'slide down' : settings.transition;
          },
          userValues: function userValues() {
            var values = module.get.values();

            if (!values) {
              return false;
            }

            values = $.isArray(values) ? values : [values];
            return $.grep(values, function (value) {
              return module.get.item(value) === false;
            });
          },
          uniqueArray: function uniqueArray(array) {
            return $.grep(array, function (value, index) {
              return $.inArray(value, array) === index;
            });
          },
          caretPosition: function caretPosition() {
            var input = $search.get(0),
                range,
                rangeLength;

            if ('selectionStart' in input) {
              return input.selectionStart;
            } else if (document.selection) {
              input.focus();
              range = document.selection.createRange();
              rangeLength = range.text.length;
              range.moveStart('character', -input.value.length);
              return range.text.length - rangeLength;
            }
          },
          value: function value() {
            var value = $input.length > 0 ? $input.val() : $module.data(metadata.value),
                isEmptyMultiselect = $.isArray(value) && value.length === 1 && value[0] === ''; // prevents placeholder element from being selected when multiple

            return value === undefined || isEmptyMultiselect ? '' : value;
          },
          values: function values() {
            var value = module.get.value();

            if (value === '') {
              return '';
            }

            return !module.has.selectInput() && module.is.multiple() ? typeof value == 'string' ? // delimited string
            value.split(settings.delimiter) : '' : value;
          },
          remoteValues: function remoteValues() {
            var values = module.get.values(),
                remoteValues = false;

            if (values) {
              if (typeof values == 'string') {
                values = [values];
              }

              $.each(values, function (index, value) {
                var name = module.read.remoteData(value);
                module.verbose('Restoring value from session data', name, value);

                if (name) {
                  if (!remoteValues) {
                    remoteValues = {};
                  }

                  remoteValues[value] = name;
                }
              });
            }

            return remoteValues;
          },
          choiceText: function choiceText($choice, preserveHTML) {
            preserveHTML = preserveHTML !== undefined ? preserveHTML : settings.preserveHTML;

            if ($choice) {
              if ($choice.find(selector.menu).length > 0) {
                module.verbose('Retrieving text of element with sub-menu');
                $choice = $choice.clone();
                $choice.find(selector.menu).remove();
                $choice.find(selector.menuIcon).remove();
              }

              return $choice.data(metadata.text) !== undefined ? $choice.data(metadata.text) : preserveHTML ? $.trim($choice.html()) : $.trim($choice.text());
            }
          },
          choiceValue: function choiceValue($choice, choiceText) {
            choiceText = choiceText || module.get.choiceText($choice);

            if (!$choice) {
              return false;
            }

            return $choice.data(metadata.value) !== undefined ? String($choice.data(metadata.value)) : typeof choiceText === 'string' ? $.trim(choiceText.toLowerCase()) : String(choiceText);
          },
          inputEvent: function inputEvent() {
            var input = $search[0];

            if (input) {
              return input.oninput !== undefined ? 'input' : input.onpropertychange !== undefined ? 'propertychange' : 'keyup';
            }

            return false;
          },
          selectValues: function selectValues() {
            var select = {};
            select.values = [];
            $module.find('option').each(function () {
              var $option = $(this),
                  name = $option.html(),
                  disabled = $option.attr('disabled'),
                  value = $option.attr('value') !== undefined ? $option.attr('value') : name;

              if (settings.placeholder === 'auto' && value === '') {
                select.placeholder = name;
              } else {
                select.values.push({
                  name: name,
                  value: value,
                  disabled: disabled
                });
              }
            });

            if (settings.placeholder && settings.placeholder !== 'auto') {
              module.debug('Setting placeholder value to', settings.placeholder);
              select.placeholder = settings.placeholder;
            }

            if (settings.sortSelect) {
              select.values.sort(function (a, b) {
                return a.name > b.name ? 1 : -1;
              });
              module.debug('Retrieved and sorted values from select', select);
            } else {
              module.debug('Retrieved values from select', select);
            }

            return select;
          },
          activeItem: function activeItem() {
            return $item.filter('.' + className.active);
          },
          selectedItem: function selectedItem() {
            var $selectedItem = $item.not(selector.unselectable).filter('.' + className.selected);
            return $selectedItem.length > 0 ? $selectedItem : $item.eq(0);
          },
          itemWithAdditions: function itemWithAdditions(value) {
            var $items = module.get.item(value),
                $userItems = module.create.userChoice(value),
                hasUserItems = $userItems && $userItems.length > 0;

            if (hasUserItems) {
              $items = $items.length > 0 ? $items.add($userItems) : $userItems;
            }

            return $items;
          },
          item: function item(value, strict) {
            var $selectedItem = false,
                shouldSearch,
                isMultiple;
            value = value !== undefined ? value : module.get.values() !== undefined ? module.get.values() : module.get.text();
            shouldSearch = isMultiple ? value.length > 0 : value !== undefined && value !== null;
            isMultiple = module.is.multiple() && $.isArray(value);
            strict = value === '' || value === 0 ? true : strict || false;

            if (shouldSearch) {
              $item.each(function () {
                var $choice = $(this),
                    optionText = module.get.choiceText($choice),
                    optionValue = module.get.choiceValue($choice, optionText); // safe early exit

                if (optionValue === null || optionValue === undefined) {
                  return;
                }

                if (isMultiple) {
                  if ($.inArray(String(optionValue), value) !== -1 || $.inArray(optionText, value) !== -1) {
                    $selectedItem = $selectedItem ? $selectedItem.add($choice) : $choice;
                  }
                } else if (strict) {
                  module.verbose('Ambiguous dropdown value using strict type check', $choice, value);

                  if (optionValue === value || optionText === value) {
                    $selectedItem = $choice;
                    return true;
                  }
                } else {
                  if (String(optionValue) == String(value) || optionText == value) {
                    module.verbose('Found select item by value', optionValue, value);
                    $selectedItem = $choice;
                    return true;
                  }
                }
              });
            }

            return $selectedItem;
          }
        },
        check: {
          maxSelections: function maxSelections(selectionCount) {
            if (settings.maxSelections) {
              selectionCount = selectionCount !== undefined ? selectionCount : module.get.selectionCount();

              if (selectionCount >= settings.maxSelections) {
                module.debug('Maximum selection count reached');

                if (settings.useLabels) {
                  $item.addClass(className.filtered);
                  module.add.message(message.maxSelections);
                }

                return true;
              } else {
                module.verbose('No longer at maximum selection count');
                module.remove.message();
                module.remove.filteredItem();

                if (module.is.searchSelection()) {
                  module.filterItems();
                }

                return false;
              }
            }

            return true;
          }
        },
        restore: {
          defaults: function defaults() {
            module.clear();
            module.restore.defaultText();
            module.restore.defaultValue();
          },
          defaultText: function defaultText() {
            var defaultText = module.get.defaultText(),
                placeholderText = module.get.placeholderText;

            if (defaultText === placeholderText) {
              module.debug('Restoring default placeholder text', defaultText);
              module.set.placeholderText(defaultText);
            } else {
              module.debug('Restoring default text', defaultText);
              module.set.text(defaultText);
            }
          },
          placeholderText: function placeholderText() {
            module.set.placeholderText();
          },
          defaultValue: function defaultValue() {
            var defaultValue = module.get.defaultValue();

            if (defaultValue !== undefined) {
              module.debug('Restoring default value', defaultValue);

              if (defaultValue !== '') {
                module.set.value(defaultValue);
                module.set.selected();
              } else {
                module.remove.activeItem();
                module.remove.selectedItem();
              }
            }
          },
          labels: function labels() {
            if (settings.allowAdditions) {
              if (!settings.useLabels) {
                module.error(error.labels);
                settings.useLabels = true;
              }

              module.debug('Restoring selected values');
              module.create.userLabels();
            }

            module.check.maxSelections();
          },
          selected: function selected() {
            module.restore.values();

            if (module.is.multiple()) {
              module.debug('Restoring previously selected values and labels');
              module.restore.labels();
            } else {
              module.debug('Restoring previously selected values');
            }
          },
          values: function values() {
            // prevents callbacks from occurring on initial load
            module.set.initialLoad();

            if (settings.apiSettings && settings.saveRemoteData && module.get.remoteValues()) {
              module.restore.remoteValues();
            } else {
              module.set.selected();
            }

            module.remove.initialLoad();
          },
          remoteValues: function remoteValues() {
            var values = module.get.remoteValues();
            module.debug('Recreating selected from session data', values);

            if (values) {
              if (module.is.single()) {
                $.each(values, function (value, name) {
                  module.set.text(name);
                });
              } else {
                $.each(values, function (value, name) {
                  module.add.label(value, name);
                });
              }
            }
          }
        },
        read: {
          remoteData: function remoteData(value) {
            var name;

            if (window.Storage === undefined) {
              module.error(error.noStorage);
              return;
            }

            name = sessionStorage.getItem(value);
            return name !== undefined ? name : false;
          }
        },
        save: {
          defaults: function defaults() {
            module.save.defaultText();
            module.save.placeholderText();
            module.save.defaultValue();
          },
          defaultValue: function defaultValue() {
            var value = module.get.value();
            module.verbose('Saving default value as', value);
            $module.data(metadata.defaultValue, value);
          },
          defaultText: function defaultText() {
            var text = module.get.text();
            module.verbose('Saving default text as', text);
            $module.data(metadata.defaultText, text);
          },
          placeholderText: function placeholderText() {
            var text;

            if (settings.placeholder !== false && $text.hasClass(className.placeholder)) {
              text = module.get.text();
              module.verbose('Saving placeholder text as', text);
              $module.data(metadata.placeholderText, text);
            }
          },
          remoteData: function remoteData(name, value) {
            if (window.Storage === undefined) {
              module.error(error.noStorage);
              return;
            }

            module.verbose('Saving remote data to session storage', value, name);
            sessionStorage.setItem(value, name);
          }
        },
        clear: function clear() {
          if (module.is.multiple() && settings.useLabels) {
            module.remove.labels();
          } else {
            module.remove.activeItem();
            module.remove.selectedItem();
          }

          module.set.placeholderText();
          module.clearValue();
        },
        clearValue: function clearValue() {
          module.set.value('');
        },
        scrollPage: function scrollPage(direction, $selectedItem) {
          var $currentItem = $selectedItem || module.get.selectedItem(),
              $menu = $currentItem.closest(selector.menu),
              menuHeight = $menu.outerHeight(),
              currentScroll = $menu.scrollTop(),
              itemHeight = $item.eq(0).outerHeight(),
              itemsPerPage = Math.floor(menuHeight / itemHeight),
              maxScroll = $menu.prop('scrollHeight'),
              newScroll = direction == 'up' ? currentScroll - itemHeight * itemsPerPage : currentScroll + itemHeight * itemsPerPage,
              $selectableItem = $item.not(selector.unselectable),
              isWithinRange,
              $nextSelectedItem,
              elementIndex;
          elementIndex = direction == 'up' ? $selectableItem.index($currentItem) - itemsPerPage : $selectableItem.index($currentItem) + itemsPerPage;
          isWithinRange = direction == 'up' ? elementIndex >= 0 : elementIndex < $selectableItem.length;
          $nextSelectedItem = isWithinRange ? $selectableItem.eq(elementIndex) : direction == 'up' ? $selectableItem.first() : $selectableItem.last();

          if ($nextSelectedItem.length > 0) {
            module.debug('Scrolling page', direction, $nextSelectedItem);
            $currentItem.removeClass(className.selected);
            $nextSelectedItem.addClass(className.selected);

            if (settings.selectOnKeydown && module.is.single()) {
              module.set.selectedItem($nextSelectedItem);
            }

            $menu.scrollTop(newScroll);
          }
        },
        set: {
          filtered: function filtered() {
            var isMultiple = module.is.multiple(),
                isSearch = module.is.searchSelection(),
                isSearchMultiple = isMultiple && isSearch,
                searchValue = isSearch ? module.get.query() : '',
                hasSearchValue = typeof searchValue === 'string' && searchValue.length > 0,
                searchWidth = module.get.searchWidth(),
                valueIsSet = searchValue !== '';

            if (isMultiple && hasSearchValue) {
              module.verbose('Adjusting input width', searchWidth, settings.glyphWidth);
              $search.css('width', searchWidth);
            }

            if (hasSearchValue || isSearchMultiple && valueIsSet) {
              module.verbose('Hiding placeholder text');
              $text.addClass(className.filtered);
            } else if (!isMultiple || isSearchMultiple && !valueIsSet) {
              module.verbose('Showing placeholder text');
              $text.removeClass(className.filtered);
            }
          },
          empty: function empty() {
            $module.addClass(className.empty);
          },
          loading: function loading() {
            $module.addClass(className.loading);
          },
          placeholderText: function placeholderText(text) {
            text = text || module.get.placeholderText();
            module.debug('Setting placeholder text', text);
            module.set.text(text);
            $text.addClass(className.placeholder);
          },
          tabbable: function tabbable() {
            if (module.is.searchSelection()) {
              module.debug('Added tabindex to searchable dropdown');
              $search.val('').attr('tabindex', 0);
              $menu.attr('tabindex', -1);
            } else {
              module.debug('Added tabindex to dropdown');

              if ($module.attr('tabindex') === undefined) {
                $module.attr('tabindex', 0);
                $menu.attr('tabindex', -1);
              }
            }
          },
          initialLoad: function initialLoad() {
            module.verbose('Setting initial load');
            _initialLoad2 = true;
          },
          activeItem: function activeItem($item) {
            if (settings.allowAdditions && $item.filter(selector.addition).length > 0) {
              $item.addClass(className.filtered);
            } else {
              $item.addClass(className.active);
            }
          },
          partialSearch: function partialSearch(text) {
            var length = module.get.query().length;
            $search.val(text.substr(0, length));
          },
          scrollPosition: function scrollPosition($item, forceScroll) {
            var edgeTolerance = 5,
                $menu,
                hasActive,
                offset,
                itemHeight,
                itemOffset,
                menuOffset,
                menuScroll,
                menuHeight,
                abovePage,
                belowPage;
            $item = $item || module.get.selectedItem();
            $menu = $item.closest(selector.menu);
            hasActive = $item && $item.length > 0;
            forceScroll = forceScroll !== undefined ? forceScroll : false;

            if ($item && $menu.length > 0 && hasActive) {
              itemOffset = $item.position().top;
              $menu.addClass(className.loading);
              menuScroll = $menu.scrollTop();
              menuOffset = $menu.offset().top;
              itemOffset = $item.offset().top;
              offset = menuScroll - menuOffset + itemOffset;

              if (!forceScroll) {
                menuHeight = $menu.height();
                belowPage = menuScroll + menuHeight < offset + edgeTolerance;
                abovePage = offset - edgeTolerance < menuScroll;
              }

              module.debug('Scrolling to active item', offset);

              if (forceScroll || abovePage || belowPage) {
                $menu.scrollTop(offset);
              }

              $menu.removeClass(className.loading);
            }
          },
          text: function text(_text) {
            if (settings.action !== 'select') {
              if (settings.action == 'combo') {
                module.debug('Changing combo button text', _text, $combo);

                if (settings.preserveHTML) {
                  $combo.html(_text);
                } else {
                  $combo.text(_text);
                }
              } else {
                if (_text !== module.get.placeholderText()) {
                  $text.removeClass(className.placeholder);
                }

                module.debug('Changing text', _text, $text);
                $text.removeClass(className.filtered);

                if (settings.preserveHTML) {
                  $text.html(_text);
                } else {
                  $text.text(_text);
                }
              }
            }
          },
          selectedItem: function selectedItem($item) {
            var value = module.get.choiceValue($item),
                searchText = module.get.choiceText($item, false),
                text = module.get.choiceText($item, true);
            module.debug('Setting user selection to item', $item);
            module.remove.activeItem();
            module.set.partialSearch(searchText);
            module.set.activeItem($item);
            module.set.selected(value, $item);
            module.set.text(text);
          },
          selectedLetter: function selectedLetter(letter) {
            var $selectedItem = $item.filter('.' + className.selected),
                alreadySelectedLetter = $selectedItem.length > 0 && module.has.firstLetter($selectedItem, letter),
                $nextValue = false,
                $nextItem; // check next of same letter

            if (alreadySelectedLetter) {
              $nextItem = $selectedItem.nextAll($item).eq(0);

              if (module.has.firstLetter($nextItem, letter)) {
                $nextValue = $nextItem;
              }
            } // check all values


            if (!$nextValue) {
              $item.each(function () {
                if (module.has.firstLetter($(this), letter)) {
                  $nextValue = $(this);
                  return false;
                }
              });
            } // set next value


            if ($nextValue) {
              module.verbose('Scrolling to next value with letter', letter);
              module.set.scrollPosition($nextValue);
              $selectedItem.removeClass(className.selected);
              $nextValue.addClass(className.selected);

              if (settings.selectOnKeydown && module.is.single()) {
                module.set.selectedItem($nextValue);
              }
            }
          },
          direction: function direction($menu) {
            if (settings.direction == 'auto') {
              // reset position
              module.remove.upward();

              if (module.can.openDownward($menu)) {
                module.remove.upward($menu);
              } else {
                module.set.upward($menu);
              }

              if (!module.is.leftward($menu) && !module.can.openRightward($menu)) {
                module.set.leftward($menu);
              }
            } else if (settings.direction == 'upward') {
              module.set.upward($menu);
            }
          },
          upward: function upward($currentMenu) {
            var $element = $currentMenu || $module;
            $element.addClass(className.upward);
          },
          leftward: function leftward($currentMenu) {
            var $element = $currentMenu || $menu;
            $element.addClass(className.leftward);
          },
          value: function value(_value2, text, $selected) {
            var escapedValue = module.escape.value(_value2),
                hasInput = $input.length > 0,
                currentValue = module.get.values(),
                stringValue = _value2 !== undefined ? String(_value2) : _value2,
                newValue;

            if (hasInput) {
              if (!settings.allowReselection && stringValue == currentValue) {
                module.verbose('Skipping value update already same value', _value2, currentValue);

                if (!module.is.initialLoad()) {
                  return;
                }
              }

              if (module.is.single() && module.has.selectInput() && module.can.extendSelect()) {
                module.debug('Adding user option', _value2);
                module.add.optionValue(_value2);
              }

              module.debug('Updating input value', escapedValue, currentValue);
              internalChange = true;
              $input.val(escapedValue);

              if (settings.fireOnInit === false && module.is.initialLoad()) {
                module.debug('Input native change event ignored on initial load');
              } else {
                module.trigger.change();
              }

              internalChange = false;
            } else {
              module.verbose('Storing value in metadata', escapedValue, $input);

              if (escapedValue !== currentValue) {
                $module.data(metadata.value, stringValue);
              }
            }

            if (module.is.single() && settings.clearable) {
              // treat undefined or '' as empty
              if (!escapedValue) {
                module.remove.clearable();
              } else {
                module.set.clearable();
              }
            }

            if (settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('No callback on initial load', settings.onChange);
            } else {
              settings.onChange.call(element, _value2, text, $selected);
            }
          },
          active: function active() {
            $module.addClass(className.active);
          },
          multiple: function multiple() {
            $module.addClass(className.multiple);
          },
          visible: function visible() {
            $module.addClass(className.visible);
          },
          exactly: function exactly(value, $selectedItem) {
            module.debug('Setting selected to exact values');
            module.clear();
            module.set.selected(value, $selectedItem);
          },
          selected: function selected(value, $selectedItem) {
            var isMultiple = module.is.multiple(),
                $userSelectedItem;
            $selectedItem = settings.allowAdditions ? $selectedItem || module.get.itemWithAdditions(value) : $selectedItem || module.get.item(value);

            if (!$selectedItem) {
              return;
            }

            module.debug('Setting selected menu item to', $selectedItem);

            if (module.is.multiple()) {
              module.remove.searchWidth();
            }

            if (module.is.single()) {
              module.remove.activeItem();
              module.remove.selectedItem();
            } else if (settings.useLabels) {
              module.remove.selectedItem();
            } // select each item


            $selectedItem.each(function () {
              var $selected = $(this),
                  selectedText = module.get.choiceText($selected),
                  selectedValue = module.get.choiceValue($selected, selectedText),
                  isFiltered = $selected.hasClass(className.filtered),
                  isActive = $selected.hasClass(className.active),
                  isUserValue = $selected.hasClass(className.addition),
                  shouldAnimate = isMultiple && $selectedItem.length == 1;

              if (isMultiple) {
                if (!isActive || isUserValue) {
                  if (settings.apiSettings && settings.saveRemoteData) {
                    module.save.remoteData(selectedText, selectedValue);
                  }

                  if (settings.useLabels) {
                    module.add.label(selectedValue, selectedText, shouldAnimate);
                    module.add.value(selectedValue, selectedText, $selected);
                    module.set.activeItem($selected);
                    module.filterActive();
                    module.select.nextAvailable($selectedItem);
                  } else {
                    module.add.value(selectedValue, selectedText, $selected);
                    module.set.text(module.add.variables(message.count));
                    module.set.activeItem($selected);
                  }
                } else if (!isFiltered) {
                  module.debug('Selected active value, removing label');
                  module.remove.selected(selectedValue);
                }
              } else {
                if (settings.apiSettings && settings.saveRemoteData) {
                  module.save.remoteData(selectedText, selectedValue);
                }

                module.set.text(selectedText);
                module.set.value(selectedValue, selectedText, $selected);
                $selected.addClass(className.active).addClass(className.selected);
              }
            });
          },
          clearable: function clearable() {
            $icon.addClass(className.clear);
          }
        },
        add: {
          label: function label(value, text, shouldAnimate) {
            var $next = module.is.searchSelection() ? $search : $text,
                escapedValue = module.escape.value(value),
                $label;

            if (settings.ignoreCase) {
              escapedValue = escapedValue.toLowerCase();
            }

            $label = $('<a />').addClass(className.label).attr('data-' + metadata.value, escapedValue).html(templates.label(escapedValue, text));
            $label = settings.onLabelCreate.call($label, escapedValue, text);

            if (module.has.label(value)) {
              module.debug('User selection already exists, skipping', escapedValue);
              return;
            }

            if (settings.label.variation) {
              $label.addClass(settings.label.variation);
            }

            if (shouldAnimate === true) {
              module.debug('Animating in label', $label);
              $label.addClass(className.hidden).insertBefore($next).transition(settings.label.transition, settings.label.duration);
            } else {
              module.debug('Adding selection label', $label);
              $label.insertBefore($next);
            }
          },
          message: function message(_message) {
            var $message = $menu.children(selector.message),
                html = settings.templates.message(module.add.variables(_message));

            if ($message.length > 0) {
              $message.html(html);
            } else {
              $message = $('<div/>').html(html).addClass(className.message).appendTo($menu);
            }
          },
          optionValue: function optionValue(value) {
            var escapedValue = module.escape.value(value),
                $option = $input.find('option[value="' + module.escape.string(escapedValue) + '"]'),
                hasOption = $option.length > 0;

            if (hasOption) {
              return;
            } // temporarily disconnect observer


            module.disconnect.selectObserver();

            if (module.is.single()) {
              module.verbose('Removing previous user addition');
              $input.find('option.' + className.addition).remove();
            }

            $('<option/>').prop('value', escapedValue).addClass(className.addition).html(value).appendTo($input);
            module.verbose('Adding user addition as an <option>', value);
            module.observe.select();
          },
          userSuggestion: function userSuggestion(value) {
            var $addition = $menu.children(selector.addition),
                $existingItem = module.get.item(value),
                alreadyHasValue = $existingItem && $existingItem.not(selector.addition).length,
                hasUserSuggestion = $addition.length > 0,
                html;

            if (settings.useLabels && module.has.maxSelections()) {
              return;
            }

            if (value === '' || alreadyHasValue) {
              $addition.remove();
              return;
            }

            if (hasUserSuggestion) {
              $addition.data(metadata.value, value).data(metadata.text, value).attr('data-' + metadata.value, value).attr('data-' + metadata.text, value).removeClass(className.filtered);

              if (!settings.hideAdditions) {
                html = settings.templates.addition(module.add.variables(message.addResult, value));
                $addition.html(html);
              }

              module.verbose('Replacing user suggestion with new value', $addition);
            } else {
              $addition = module.create.userChoice(value);
              $addition.prependTo($menu);
              module.verbose('Adding item choice to menu corresponding with user choice addition', $addition);
            }

            if (!settings.hideAdditions || module.is.allFiltered()) {
              $addition.addClass(className.selected).siblings().removeClass(className.selected);
            }

            module.refreshItems();
          },
          variables: function variables(message, term) {
            var hasCount = message.search('{count}') !== -1,
                hasMaxCount = message.search('{maxCount}') !== -1,
                hasTerm = message.search('{term}') !== -1,
                values,
                count,
                query;
            module.verbose('Adding templated variables to message', message);

            if (hasCount) {
              count = module.get.selectionCount();
              message = message.replace('{count}', count);
            }

            if (hasMaxCount) {
              count = module.get.selectionCount();
              message = message.replace('{maxCount}', settings.maxSelections);
            }

            if (hasTerm) {
              query = term || module.get.query();
              message = message.replace('{term}', query);
            }

            return message;
          },
          value: function value(addedValue, addedText, $selectedItem) {
            var currentValue = module.get.values(),
                newValue;

            if (module.has.value(addedValue)) {
              module.debug('Value already selected');
              return;
            }

            if (addedValue === '') {
              module.debug('Cannot select blank values from multiselect');
              return;
            } // extend current array


            if ($.isArray(currentValue)) {
              newValue = currentValue.concat([addedValue]);
              newValue = module.get.uniqueArray(newValue);
            } else {
              newValue = [addedValue];
            } // add values


            if (module.has.selectInput()) {
              if (module.can.extendSelect()) {
                module.debug('Adding value to select', addedValue, newValue, $input);
                module.add.optionValue(addedValue);
              }
            } else {
              newValue = newValue.join(settings.delimiter);
              module.debug('Setting hidden input to delimited value', newValue, $input);
            }

            if (settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('Skipping onadd callback on initial load', settings.onAdd);
            } else {
              settings.onAdd.call(element, addedValue, addedText, $selectedItem);
            }

            module.set.value(newValue, addedValue, addedText, $selectedItem);
            module.check.maxSelections();
          }
        },
        remove: {
          active: function active() {
            $module.removeClass(className.active);
          },
          activeLabel: function activeLabel() {
            $module.find(selector.label).removeClass(className.active);
          },
          empty: function empty() {
            $module.removeClass(className.empty);
          },
          loading: function loading() {
            $module.removeClass(className.loading);
          },
          initialLoad: function initialLoad() {
            _initialLoad2 = false;
          },
          upward: function upward($currentMenu) {
            var $element = $currentMenu || $module;
            $element.removeClass(className.upward);
          },
          leftward: function leftward($currentMenu) {
            var $element = $currentMenu || $menu;
            $element.removeClass(className.leftward);
          },
          visible: function visible() {
            $module.removeClass(className.visible);
          },
          activeItem: function activeItem() {
            $item.removeClass(className.active);
          },
          filteredItem: function filteredItem() {
            if (settings.useLabels && module.has.maxSelections()) {
              return;
            }

            if (settings.useLabels && module.is.multiple()) {
              $item.not('.' + className.active).removeClass(className.filtered);
            } else {
              $item.removeClass(className.filtered);
            }

            module.remove.empty();
          },
          optionValue: function optionValue(value) {
            var escapedValue = module.escape.value(value),
                $option = $input.find('option[value="' + module.escape.string(escapedValue) + '"]'),
                hasOption = $option.length > 0;

            if (!hasOption || !$option.hasClass(className.addition)) {
              return;
            } // temporarily disconnect observer


            if (_selectObserver) {
              _selectObserver.disconnect();

              module.verbose('Temporarily disconnecting mutation observer');
            }

            $option.remove();
            module.verbose('Removing user addition as an <option>', escapedValue);

            if (_selectObserver) {
              _selectObserver.observe($input[0], {
                childList: true,
                subtree: true
              });
            }
          },
          message: function message() {
            $menu.children(selector.message).remove();
          },
          searchWidth: function searchWidth() {
            $search.css('width', '');
          },
          searchTerm: function searchTerm() {
            module.verbose('Cleared search term');
            $search.val('');
            module.set.filtered();
          },
          userAddition: function userAddition() {
            $item.filter(selector.addition).remove();
          },
          selected: function selected(value, $selectedItem) {
            $selectedItem = settings.allowAdditions ? $selectedItem || module.get.itemWithAdditions(value) : $selectedItem || module.get.item(value);

            if (!$selectedItem) {
              return false;
            }

            $selectedItem.each(function () {
              var $selected = $(this),
                  selectedText = module.get.choiceText($selected),
                  selectedValue = module.get.choiceValue($selected, selectedText);

              if (module.is.multiple()) {
                if (settings.useLabels) {
                  module.remove.value(selectedValue, selectedText, $selected);
                  module.remove.label(selectedValue);
                } else {
                  module.remove.value(selectedValue, selectedText, $selected);

                  if (module.get.selectionCount() === 0) {
                    module.set.placeholderText();
                  } else {
                    module.set.text(module.add.variables(message.count));
                  }
                }
              } else {
                module.remove.value(selectedValue, selectedText, $selected);
              }

              $selected.removeClass(className.filtered).removeClass(className.active);

              if (settings.useLabels) {
                $selected.removeClass(className.selected);
              }
            });
          },
          selectedItem: function selectedItem() {
            $item.removeClass(className.selected);
          },
          value: function value(removedValue, removedText, $removedItem) {
            var values = module.get.values(),
                newValue;

            if (module.has.selectInput()) {
              module.verbose('Input is <select> removing selected option', removedValue);
              newValue = module.remove.arrayValue(removedValue, values);
              module.remove.optionValue(removedValue);
            } else {
              module.verbose('Removing from delimited values', removedValue);
              newValue = module.remove.arrayValue(removedValue, values);
              newValue = newValue.join(settings.delimiter);
            }

            if (settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('No callback on initial load', settings.onRemove);
            } else {
              settings.onRemove.call(element, removedValue, removedText, $removedItem);
            }

            module.set.value(newValue, removedText, $removedItem);
            module.check.maxSelections();
          },
          arrayValue: function arrayValue(removedValue, values) {
            if (!$.isArray(values)) {
              values = [values];
            }

            values = $.grep(values, function (value) {
              return removedValue != value;
            });
            module.verbose('Removed value from delimited string', removedValue, values);
            return values;
          },
          label: function label(value, shouldAnimate) {
            var $labels = $module.find(selector.label),
                $removedLabel = $labels.filter('[data-' + metadata.value + '="' + module.escape.string(value) + '"]');
            module.verbose('Removing label', $removedLabel);
            $removedLabel.remove();
          },
          activeLabels: function activeLabels($activeLabels) {
            $activeLabels = $activeLabels || $module.find(selector.label).filter('.' + className.active);
            module.verbose('Removing active label selections', $activeLabels);
            module.remove.labels($activeLabels);
          },
          labels: function labels($labels) {
            $labels = $labels || $module.find(selector.label);
            module.verbose('Removing labels', $labels);
            $labels.each(function () {
              var $label = $(this),
                  value = $label.data(metadata.value),
                  stringValue = value !== undefined ? String(value) : value,
                  isUserValue = module.is.userValue(stringValue);

              if (settings.onLabelRemove.call($label, value) === false) {
                module.debug('Label remove callback cancelled removal');
                return;
              }

              module.remove.message();

              if (isUserValue) {
                module.remove.value(stringValue);
                module.remove.label(stringValue);
              } else {
                // selected will also remove label
                module.remove.selected(stringValue);
              }
            });
          },
          tabbable: function tabbable() {
            if (module.is.searchSelection()) {
              module.debug('Searchable dropdown initialized');
              $search.removeAttr('tabindex');
              $menu.removeAttr('tabindex');
            } else {
              module.debug('Simple selection dropdown initialized');
              $module.removeAttr('tabindex');
              $menu.removeAttr('tabindex');
            }
          },
          clearable: function clearable() {
            $icon.removeClass(className.clear);
          }
        },
        has: {
          menuSearch: function menuSearch() {
            return module.has.search() && $search.closest($menu).length > 0;
          },
          search: function search() {
            return $search.length > 0;
          },
          sizer: function sizer() {
            return $sizer.length > 0;
          },
          selectInput: function selectInput() {
            return $input.is('select');
          },
          minCharacters: function minCharacters(searchTerm) {
            if (settings.minCharacters) {
              searchTerm = searchTerm !== undefined ? String(searchTerm) : String(module.get.query());
              return searchTerm.length >= settings.minCharacters;
            }

            return true;
          },
          firstLetter: function firstLetter($item, letter) {
            var text, firstLetter;

            if (!$item || $item.length === 0 || typeof letter !== 'string') {
              return false;
            }

            text = module.get.choiceText($item, false);
            letter = letter.toLowerCase();
            firstLetter = String(text).charAt(0).toLowerCase();
            return letter == firstLetter;
          },
          input: function input() {
            return $input.length > 0;
          },
          items: function items() {
            return $item.length > 0;
          },
          menu: function menu() {
            return $menu.length > 0;
          },
          message: function message() {
            return $menu.children(selector.message).length !== 0;
          },
          label: function label(value) {
            var escapedValue = module.escape.value(value),
                $labels = $module.find(selector.label);

            if (settings.ignoreCase) {
              escapedValue = escapedValue.toLowerCase();
            }

            return $labels.filter('[data-' + metadata.value + '="' + module.escape.string(escapedValue) + '"]').length > 0;
          },
          maxSelections: function maxSelections() {
            return settings.maxSelections && module.get.selectionCount() >= settings.maxSelections;
          },
          allResultsFiltered: function allResultsFiltered() {
            var $normalResults = $item.not(selector.addition);
            return $normalResults.filter(selector.unselectable).length === $normalResults.length;
          },
          userSuggestion: function userSuggestion() {
            return $menu.children(selector.addition).length > 0;
          },
          query: function query() {
            return module.get.query() !== '';
          },
          value: function value(_value3) {
            return settings.ignoreCase ? module.has.valueIgnoringCase(_value3) : module.has.valueMatchingCase(_value3);
          },
          valueMatchingCase: function valueMatchingCase(value) {
            var values = module.get.values(),
                hasValue = $.isArray(values) ? values && $.inArray(value, values) !== -1 : values == value;
            return hasValue ? true : false;
          },
          valueIgnoringCase: function valueIgnoringCase(value) {
            var values = module.get.values(),
                hasValue = false;

            if (!$.isArray(values)) {
              values = [values];
            }

            $.each(values, function (index, existingValue) {
              if (String(value).toLowerCase() == String(existingValue).toLowerCase()) {
                hasValue = true;
                return false;
              }
            });
            return hasValue;
          }
        },
        is: {
          active: function active() {
            return $module.hasClass(className.active);
          },
          animatingInward: function animatingInward() {
            return $menu.transition('is inward');
          },
          animatingOutward: function animatingOutward() {
            return $menu.transition('is outward');
          },
          bubbledLabelClick: function bubbledLabelClick(event) {
            return $(event.target).is('select, input') && $module.closest('label').length > 0;
          },
          bubbledIconClick: function bubbledIconClick(event) {
            return $(event.target).closest($icon).length > 0;
          },
          alreadySetup: function alreadySetup() {
            return $module.is('select') && $module.parent(selector.dropdown).data(moduleNamespace) !== undefined && $module.prev().length === 0;
          },
          animating: function animating($subMenu) {
            return $subMenu ? $subMenu.transition && $subMenu.transition('is animating') : $menu.transition && $menu.transition('is animating');
          },
          leftward: function leftward($subMenu) {
            var $selectedMenu = $subMenu || $menu;
            return $selectedMenu.hasClass(className.leftward);
          },
          disabled: function disabled() {
            return $module.hasClass(className.disabled);
          },
          focused: function focused() {
            return document.activeElement === $module[0];
          },
          focusedOnSearch: function focusedOnSearch() {
            return document.activeElement === $search[0];
          },
          allFiltered: function allFiltered() {
            return (module.is.multiple() || module.has.search()) && !(settings.hideAdditions == false && module.has.userSuggestion()) && !module.has.message() && module.has.allResultsFiltered();
          },
          hidden: function hidden($subMenu) {
            return !module.is.visible($subMenu);
          },
          initialLoad: function initialLoad() {
            return _initialLoad2;
          },
          inObject: function inObject(needle, object) {
            var found = false;
            $.each(object, function (index, property) {
              if (property == needle) {
                found = true;
                return true;
              }
            });
            return found;
          },
          multiple: function multiple() {
            return $module.hasClass(className.multiple);
          },
          remote: function remote() {
            return settings.apiSettings && module.can.useAPI();
          },
          single: function single() {
            return !module.is.multiple();
          },
          selectMutation: function selectMutation(mutations) {
            var selectChanged = false;
            $.each(mutations, function (index, mutation) {
              if (mutation.target && $(mutation.target).is('select')) {
                selectChanged = true;
                return true;
              }
            });
            return selectChanged;
          },
          search: function search() {
            return $module.hasClass(className.search);
          },
          searchSelection: function searchSelection() {
            return module.has.search() && $search.parent(selector.dropdown).length === 1;
          },
          selection: function selection() {
            return $module.hasClass(className.selection);
          },
          userValue: function userValue(value) {
            return $.inArray(value, module.get.userValues()) !== -1;
          },
          upward: function upward($menu) {
            var $element = $menu || $module;
            return $element.hasClass(className.upward);
          },
          visible: function visible($subMenu) {
            return $subMenu ? $subMenu.hasClass(className.visible) : $menu.hasClass(className.visible);
          },
          verticallyScrollableContext: function verticallyScrollableContext() {
            var overflowY = $context.get(0) !== window ? $context.css('overflow-y') : false;
            return overflowY == 'auto' || overflowY == 'scroll';
          },
          horizontallyScrollableContext: function horizontallyScrollableContext() {
            var overflowX = $context.get(0) !== window ? $context.css('overflow-X') : false;
            return overflowX == 'auto' || overflowX == 'scroll';
          }
        },
        can: {
          activate: function activate($item) {
            if (settings.useLabels) {
              return true;
            }

            if (!module.has.maxSelections()) {
              return true;
            }

            if (module.has.maxSelections() && $item.hasClass(className.active)) {
              return true;
            }

            return false;
          },
          openDownward: function openDownward($subMenu) {
            var $currentMenu = $subMenu || $menu,
                canOpenDownward = true,
                onScreen = {},
                calculations;
            $currentMenu.addClass(className.loading);
            calculations = {
              context: {
                offset: $context.get(0) === window ? {
                  top: 0,
                  left: 0
                } : $context.offset(),
                scrollTop: $context.scrollTop(),
                height: $context.outerHeight()
              },
              menu: {
                offset: $currentMenu.offset(),
                height: $currentMenu.outerHeight()
              }
            };

            if (module.is.verticallyScrollableContext()) {
              calculations.menu.offset.top += calculations.context.scrollTop;
            }

            onScreen = {
              above: calculations.context.scrollTop <= calculations.menu.offset.top - calculations.context.offset.top - calculations.menu.height,
              below: calculations.context.scrollTop + calculations.context.height >= calculations.menu.offset.top - calculations.context.offset.top + calculations.menu.height
            };

            if (onScreen.below) {
              module.verbose('Dropdown can fit in context downward', onScreen);
              canOpenDownward = true;
            } else if (!onScreen.below && !onScreen.above) {
              module.verbose('Dropdown cannot fit in either direction, favoring downward', onScreen);
              canOpenDownward = true;
            } else {
              module.verbose('Dropdown cannot fit below, opening upward', onScreen);
              canOpenDownward = false;
            }

            $currentMenu.removeClass(className.loading);
            return canOpenDownward;
          },
          openRightward: function openRightward($subMenu) {
            var $currentMenu = $subMenu || $menu,
                canOpenRightward = true,
                isOffscreenRight = false,
                calculations;
            $currentMenu.addClass(className.loading);
            calculations = {
              context: {
                offset: $context.get(0) === window ? {
                  top: 0,
                  left: 0
                } : $context.offset(),
                scrollLeft: $context.scrollLeft(),
                width: $context.outerWidth()
              },
              menu: {
                offset: $currentMenu.offset(),
                width: $currentMenu.outerWidth()
              }
            };

            if (module.is.horizontallyScrollableContext()) {
              calculations.menu.offset.left += calculations.context.scrollLeft;
            }

            isOffscreenRight = calculations.menu.offset.left - calculations.context.offset.left + calculations.menu.width >= calculations.context.scrollLeft + calculations.context.width;

            if (isOffscreenRight) {
              module.verbose('Dropdown cannot fit in context rightward', isOffscreenRight);
              canOpenRightward = false;
            }

            $currentMenu.removeClass(className.loading);
            return canOpenRightward;
          },
          click: function click() {
            return hasTouch || settings.on == 'click';
          },
          extendSelect: function extendSelect() {
            return settings.allowAdditions || settings.apiSettings;
          },
          show: function show() {
            return !module.is.disabled() && (module.has.items() || module.has.message());
          },
          useAPI: function useAPI() {
            return $.fn.api !== undefined;
          }
        },
        animate: {
          show: function show(callback, $subMenu) {
            var $currentMenu = $subMenu || $menu,
                start = $subMenu ? function () {} : function () {
              module.hideSubMenus();
              module.hideOthers();
              module.set.active();
            },
                transition;
            callback = $.isFunction(callback) ? callback : function () {};
            module.verbose('Doing menu show animation', $currentMenu);
            module.set.direction($subMenu);
            transition = module.get.transition($subMenu);

            if (module.is.selection()) {
              module.set.scrollPosition(module.get.selectedItem(), true);
            }

            if (module.is.hidden($currentMenu) || module.is.animating($currentMenu)) {
              if (transition == 'none') {
                start();
                $currentMenu.transition('show');
                callback.call(element);
              } else if ($.fn.transition !== undefined && $module.transition('is supported')) {
                $currentMenu.transition({
                  animation: transition + ' in',
                  debug: settings.debug,
                  verbose: settings.verbose,
                  duration: settings.duration,
                  queue: true,
                  onStart: start,
                  onComplete: function onComplete() {
                    callback.call(element);
                  }
                });
              } else {
                module.error(error.noTransition, transition);
              }
            }
          },
          hide: function hide(callback, $subMenu) {
            var $currentMenu = $subMenu || $menu,
                duration = $subMenu ? settings.duration * 0.9 : settings.duration,
                start = $subMenu ? function () {} : function () {
              if (module.can.click()) {
                module.unbind.intent();
              }

              module.remove.active();
            },
                transition = module.get.transition($subMenu);
            callback = $.isFunction(callback) ? callback : function () {};

            if (module.is.visible($currentMenu) || module.is.animating($currentMenu)) {
              module.verbose('Doing menu hide animation', $currentMenu);

              if (transition == 'none') {
                start();
                $currentMenu.transition('hide');
                callback.call(element);
              } else if ($.fn.transition !== undefined && $module.transition('is supported')) {
                $currentMenu.transition({
                  animation: transition + ' out',
                  duration: settings.duration,
                  debug: settings.debug,
                  verbose: settings.verbose,
                  queue: false,
                  onStart: start,
                  onComplete: function onComplete() {
                    callback.call(element);
                  }
                });
              } else {
                module.error(error.transition);
              }
            }
          }
        },
        hideAndClear: function hideAndClear() {
          module.remove.searchTerm();

          if (module.has.maxSelections()) {
            return;
          }

          if (module.has.search()) {
            module.hide(function () {
              module.remove.filteredItem();
            });
          } else {
            module.hide();
          }
        },
        delay: {
          show: function show() {
            module.verbose('Delaying show event to ensure user intent');
            clearTimeout(module.timer);
            module.timer = setTimeout(module.show, settings.delay.show);
          },
          hide: function hide() {
            module.verbose('Delaying hide event to ensure user intent');
            clearTimeout(module.timer);
            module.timer = setTimeout(module.hide, settings.delay.hide);
          }
        },
        escape: {
          value: function value(_value4) {
            var multipleValues = $.isArray(_value4),
                stringValue = typeof _value4 === 'string',
                isUnparsable = !stringValue && !multipleValues,
                hasQuotes = stringValue && _value4.search(regExp.quote) !== -1,
                values = [];

            if (isUnparsable || !hasQuotes) {
              return _value4;
            }

            module.debug('Encoding quote values for use in select', _value4);

            if (multipleValues) {
              $.each(_value4, function (index, value) {
                values.push(value.replace(regExp.quote, '&quot;'));
              });
              return values;
            }

            return _value4.replace(regExp.quote, '&quot;');
          },
          string: function string(text) {
            text = String(text);
            return text.replace(regExp.escape, '\\$&');
          }
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                module.error(error.method, query);
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : $allModules;
  };

  $.fn.dropdown.settings = {
    silent: false,
    debug: false,
    verbose: false,
    performance: true,
    on: 'click',
    // what event should show menu action on item selection
    action: 'activate',
    // action on item selection (nothing, activate, select, combo, hide, function(){})
    values: false,
    // specify values to use for dropdown
    clearable: false,
    // whether the value of the dropdown can be cleared
    apiSettings: false,
    selectOnKeydown: true,
    // Whether selection should occur automatically when keyboard shortcuts used
    minCharacters: 0,
    // Minimum characters required to trigger API call
    filterRemoteData: false,
    // Whether API results should be filtered after being returned for query term
    saveRemoteData: true,
    // Whether remote name/value pairs should be stored in sessionStorage to allow remote data to be restored on page refresh
    throttle: 200,
    // How long to wait after last user input to search remotely
    context: window,
    // Context to use when determining if on screen
    direction: 'auto',
    // Whether dropdown should always open in one direction
    keepOnScreen: true,
    // Whether dropdown should check whether it is on screen before showing
    match: 'both',
    // what to match against with search selection (both, text, or label)
    fullTextSearch: false,
    // search anywhere in value (set to 'exact' to require exact matches)
    placeholder: 'auto',
    // whether to convert blank <select> values to placeholder text
    preserveHTML: true,
    // preserve html when selecting value
    sortSelect: false,
    // sort selection on init
    forceSelection: true,
    // force a choice on blur with search selection
    allowAdditions: false,
    // whether multiple select should allow user added values
    ignoreCase: false,
    // whether to consider values not matching in case to be the same
    hideAdditions: true,
    // whether or not to hide special message prompting a user they can enter a value
    maxSelections: false,
    // When set to a number limits the number of selections to this count
    useLabels: true,
    // whether multiple select should filter currently active selections from choices
    delimiter: ',',
    // when multiselect uses normal <input> the values will be delimited with this character
    showOnFocus: true,
    // show menu on focus
    allowReselection: false,
    // whether current value should trigger callbacks when reselected
    allowTab: true,
    // add tabindex to element
    allowCategorySelection: false,
    // allow elements with sub-menus to be selected
    fireOnInit: false,
    // Whether callbacks should fire when initializing dropdown values
    transition: 'auto',
    // auto transition will slide down or up based on direction
    duration: 200,
    // duration of transition
    glyphWidth: 1.037,
    // widest glyph width in em (W is 1.037 em) used to calculate multiselect input width
    // label settings on multi-select
    label: {
      transition: 'scale',
      duration: 200,
      variation: false
    },
    // delay before event
    delay: {
      hide: 300,
      show: 200,
      search: 20,
      touch: 50
    },

    /* Callbacks */
    onChange: function onChange(value, text, $selected) {},
    onAdd: function onAdd(value, text, $selected) {},
    onRemove: function onRemove(value, text, $selected) {},
    onLabelSelect: function onLabelSelect($selectedLabels) {},
    onLabelCreate: function onLabelCreate(value, text) {
      return $(this);
    },
    onLabelRemove: function onLabelRemove(value) {
      return true;
    },
    onNoResults: function onNoResults(searchTerm) {
      return true;
    },
    onShow: function onShow() {},
    onHide: function onHide() {},

    /* Component */
    name: 'Dropdown',
    namespace: 'dropdown',
    message: {
      addResult: 'Add <b>{term}</b>',
      count: '{count} selected',
      maxSelections: 'Max {maxCount} selections',
      noResults: 'No results found.',
      serverError: 'There was an error contacting the server'
    },
    error: {
      action: 'You called a dropdown action that was not defined',
      alreadySetup: 'Once a select has been initialized behaviors must be called on the created ui dropdown',
      labels: 'Allowing user additions currently requires the use of labels.',
      missingMultiple: '<select> requires multiple property to be set to correctly preserve multiple values',
      method: 'The method you called is not defined.',
      noAPI: 'The API module is required to load resources remotely',
      noStorage: 'Saving remote data requires session storage',
      noTransition: 'This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>'
    },
    regExp: {
      escape: /[-[\]{}()*+?.,\\^$|#\s]/g,
      quote: /"/g
    },
    metadata: {
      defaultText: 'defaultText',
      defaultValue: 'defaultValue',
      placeholderText: 'placeholder',
      text: 'text',
      value: 'value'
    },
    // property names for remote query
    fields: {
      remoteValues: 'results',
      // grouping for api results
      values: 'values',
      // grouping for all dropdown values
      disabled: 'disabled',
      // whether value should be disabled
      name: 'name',
      // displayed dropdown text
      value: 'value',
      // actual dropdown value
      text: 'text' // displayed text when selected

    },
    keys: {
      backspace: 8,
      delimiter: 188,
      // comma
      deleteKey: 46,
      enter: 13,
      escape: 27,
      pageUp: 33,
      pageDown: 34,
      leftArrow: 37,
      upArrow: 38,
      rightArrow: 39,
      downArrow: 40
    },
    selector: {
      addition: '.addition',
      dropdown: '.ui.dropdown',
      hidden: '.hidden',
      icon: '> .dropdown.icon',
      input: '> input[type="hidden"], > select',
      item: '.item',
      label: '> .label',
      remove: '> .label > .delete.icon',
      siblingLabel: '.label',
      menu: '.menu',
      message: '.message',
      menuIcon: '.dropdown.icon',
      search: 'input.search, .menu > .search > input, .menu input.search',
      sizer: '> input.sizer',
      text: '> .text:not(.icon)',
      unselectable: '.disabled, .filtered'
    },
    className: {
      active: 'active',
      addition: 'addition',
      animating: 'animating',
      clear: 'clear',
      disabled: 'disabled',
      empty: 'empty',
      dropdown: 'ui dropdown',
      filtered: 'filtered',
      hidden: 'hidden transition',
      item: 'item',
      label: 'ui label',
      loading: 'loading',
      menu: 'menu',
      message: 'message',
      multiple: 'multiple',
      placeholder: 'default',
      sizer: 'sizer',
      search: 'search',
      selected: 'selected',
      selection: 'selection',
      upward: 'upward',
      leftward: 'left',
      visible: 'visible'
    }
  };
  /* Templates */

  $.fn.dropdown.settings.templates = {
    // generates dropdown from select values
    dropdown: function dropdown(select) {
      var placeholder = select.placeholder || false,
          values = select.values || {},
          html = '';
      html += '<i class="dropdown icon"></i>';

      if (select.placeholder) {
        html += '<div class="default text">' + placeholder + '</div>';
      } else {
        html += '<div class="text"></div>';
      }

      html += '<div class="menu">';
      $.each(select.values, function (index, option) {
        html += option.disabled ? '<div class="disabled item" data-value="' + option.value + '">' + option.name + '</div>' : '<div class="item" data-value="' + option.value + '">' + option.name + '</div>';
      });
      html += '</div>';
      return html;
    },
    // generates just menu from select
    menu: function menu(response, fields) {
      var values = response[fields.values] || {},
          html = '';
      $.each(values, function (index, option) {
        var maybeText = option[fields.text] ? 'data-text="' + option[fields.text] + '"' : '',
            maybeDisabled = option[fields.disabled] ? 'disabled ' : '';
        html += '<div class="' + maybeDisabled + 'item" data-value="' + option[fields.value] + '"' + maybeText + '>';
        html += option[fields.name];
        html += '</div>';
      });
      return html;
    },
    // generates label for multiselect
    label: function label(value, text) {
      return text + '<i class="delete icon"></i>';
    },
    // generates messages like "No results"
    message: function message(_message2) {
      return _message2;
    },
    // generates user addition to selection menu
    addition: function addition(choice) {
      return choice;
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Embed
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  "use strict";

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.embed = function (parameters) {
    var $allModules = $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;
    $allModules.each(function () {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.embed.settings, parameters) : $.extend({}, $.fn.embed.settings),
          selector = settings.selector,
          className = settings.className,
          sources = settings.sources,
          error = settings.error,
          metadata = settings.metadata,
          namespace = settings.namespace,
          templates = settings.templates,
          eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          $window = $(window),
          $module = $(this),
          $placeholder = $module.find(selector.placeholder),
          $icon = $module.find(selector.icon),
          $embed = $module.find(selector.embed),
          element = this,
          instance = $module.data(moduleNamespace),
          module;
      module = {
        initialize: function initialize() {
          module.debug('Initializing embed');
          module.determine.autoplay();
          module.create();
          module.bind.events();
          module.instantiate();
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module.data(moduleNamespace, module);
        },
        destroy: function destroy() {
          module.verbose('Destroying previous instance of embed');
          module.reset();
          $module.removeData(moduleNamespace).off(eventNamespace);
        },
        refresh: function refresh() {
          module.verbose('Refreshing selector cache');
          $placeholder = $module.find(selector.placeholder);
          $icon = $module.find(selector.icon);
          $embed = $module.find(selector.embed);
        },
        bind: {
          events: function events() {
            if (module.has.placeholder()) {
              module.debug('Adding placeholder events');
              $module.on('click' + eventNamespace, selector.placeholder, module.createAndShow).on('click' + eventNamespace, selector.icon, module.createAndShow);
            }
          }
        },
        create: function create() {
          var placeholder = module.get.placeholder();

          if (placeholder) {
            module.createPlaceholder();
          } else {
            module.createAndShow();
          }
        },
        createPlaceholder: function createPlaceholder(placeholder) {
          var icon = module.get.icon(),
              url = module.get.url(),
              embed = module.generate.embed(url);
          placeholder = placeholder || module.get.placeholder();
          $module.html(templates.placeholder(placeholder, icon));
          module.debug('Creating placeholder for embed', placeholder, icon);
        },
        createEmbed: function createEmbed(url) {
          module.refresh();
          url = url || module.get.url();
          $embed = $('<div/>').addClass(className.embed).html(module.generate.embed(url)).appendTo($module);
          settings.onCreate.call(element, url);
          module.debug('Creating embed object', $embed);
        },
        changeEmbed: function changeEmbed(url) {
          $embed.html(module.generate.embed(url));
        },
        createAndShow: function createAndShow() {
          module.createEmbed();
          module.show();
        },
        // sets new embed
        change: function change(source, id, url) {
          module.debug('Changing video to ', source, id, url);
          $module.data(metadata.source, source).data(metadata.id, id);

          if (url) {
            $module.data(metadata.url, url);
          } else {
            $module.removeData(metadata.url);
          }

          if (module.has.embed()) {
            module.changeEmbed();
          } else {
            module.create();
          }
        },
        // clears embed
        reset: function reset() {
          module.debug('Clearing embed and showing placeholder');
          module.remove.data();
          module.remove.active();
          module.remove.embed();
          module.showPlaceholder();
          settings.onReset.call(element);
        },
        // shows current embed
        show: function show() {
          module.debug('Showing embed');
          module.set.active();
          settings.onDisplay.call(element);
        },
        hide: function hide() {
          module.debug('Hiding embed');
          module.showPlaceholder();
        },
        showPlaceholder: function showPlaceholder() {
          module.debug('Showing placeholder image');
          module.remove.active();
          settings.onPlaceholderDisplay.call(element);
        },
        get: {
          id: function id() {
            return settings.id || $module.data(metadata.id);
          },
          placeholder: function placeholder() {
            return settings.placeholder || $module.data(metadata.placeholder);
          },
          icon: function icon() {
            return settings.icon ? settings.icon : $module.data(metadata.icon) !== undefined ? $module.data(metadata.icon) : module.determine.icon();
          },
          source: function source(url) {
            return settings.source ? settings.source : $module.data(metadata.source) !== undefined ? $module.data(metadata.source) : module.determine.source();
          },
          type: function type() {
            var source = module.get.source();
            return sources[source] !== undefined ? sources[source].type : false;
          },
          url: function url() {
            return settings.url ? settings.url : $module.data(metadata.url) !== undefined ? $module.data(metadata.url) : module.determine.url();
          }
        },
        determine: {
          autoplay: function autoplay() {
            if (module.should.autoplay()) {
              settings.autoplay = true;
            }
          },
          source: function source(url) {
            var matchedSource = false;
            url = url || module.get.url();

            if (url) {
              $.each(sources, function (name, source) {
                if (url.search(source.domain) !== -1) {
                  matchedSource = name;
                  return false;
                }
              });
            }

            return matchedSource;
          },
          icon: function icon() {
            var source = module.get.source();
            return sources[source] !== undefined ? sources[source].icon : false;
          },
          url: function url() {
            var id = settings.id || $module.data(metadata.id),
                source = settings.source || $module.data(metadata.source),
                url;
            url = sources[source] !== undefined ? sources[source].url.replace('{id}', id) : false;

            if (url) {
              $module.data(metadata.url, url);
            }

            return url;
          }
        },
        set: {
          active: function active() {
            $module.addClass(className.active);
          }
        },
        remove: {
          data: function data() {
            $module.removeData(metadata.id).removeData(metadata.icon).removeData(metadata.placeholder).removeData(metadata.source).removeData(metadata.url);
          },
          active: function active() {
            $module.removeClass(className.active);
          },
          embed: function embed() {
            $embed.empty();
          }
        },
        encode: {
          parameters: function parameters(_parameters) {
            var urlString = [],
                index;

            for (index in _parameters) {
              urlString.push(encodeURIComponent(index) + '=' + encodeURIComponent(_parameters[index]));
            }

            return urlString.join('&amp;');
          }
        },
        generate: {
          embed: function embed(url) {
            module.debug('Generating embed html');
            var source = module.get.source(),
                html,
                parameters;
            url = module.get.url(url);

            if (url) {
              parameters = module.generate.parameters(source);
              html = templates.iframe(url, parameters);
            } else {
              module.error(error.noURL, $module);
            }

            return html;
          },
          parameters: function parameters(source, extraParameters) {
            var parameters = sources[source] && sources[source].parameters !== undefined ? sources[source].parameters(settings) : {};
            extraParameters = extraParameters || settings.parameters;

            if (extraParameters) {
              parameters = $.extend({}, parameters, extraParameters);
            }

            parameters = settings.onEmbed(parameters);
            return module.encode.parameters(parameters);
          }
        },
        has: {
          embed: function embed() {
            return $embed.length > 0;
          },
          placeholder: function placeholder() {
            return settings.placeholder || $module.data(metadata.placeholder);
          }
        },
        should: {
          autoplay: function autoplay() {
            return settings.autoplay === 'auto' ? settings.placeholder || $module.data(metadata.placeholder) !== undefined : settings.autoplay;
          }
        },
        is: {
          video: function video() {
            return module.get.type() == 'video';
          }
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ($allModules.length > 1) {
              title += ' ' + '(' + $allModules.length + ')';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                module.error(error.method, query);
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.embed.settings = {
    name: 'Embed',
    namespace: 'embed',
    silent: false,
    debug: false,
    verbose: false,
    performance: true,
    icon: false,
    source: false,
    url: false,
    id: false,
    // standard video settings
    autoplay: 'auto',
    color: '#444444',
    hd: true,
    brandedUI: false,
    // additional parameters to include with the embed
    parameters: false,
    onDisplay: function onDisplay() {},
    onPlaceholderDisplay: function onPlaceholderDisplay() {},
    onReset: function onReset() {},
    onCreate: function onCreate(url) {},
    onEmbed: function onEmbed(parameters) {
      return parameters;
    },
    metadata: {
      id: 'id',
      icon: 'icon',
      placeholder: 'placeholder',
      source: 'source',
      url: 'url'
    },
    error: {
      noURL: 'No URL specified',
      method: 'The method you called is not defined'
    },
    className: {
      active: 'active',
      embed: 'embed'
    },
    selector: {
      embed: '.embed',
      placeholder: '.placeholder',
      icon: '.icon'
    },
    sources: {
      youtube: {
        name: 'youtube',
        type: 'video',
        icon: 'video play',
        domain: 'youtube.com',
        url: '//www.youtube.com/embed/{id}',
        parameters: function parameters(settings) {
          return {
            autohide: !settings.brandedUI,
            autoplay: settings.autoplay,
            color: settings.color || undefined,
            hq: settings.hd,
            jsapi: settings.api,
            modestbranding: !settings.brandedUI
          };
        }
      },
      vimeo: {
        name: 'vimeo',
        type: 'video',
        icon: 'video play',
        domain: 'vimeo.com',
        url: '//player.vimeo.com/video/{id}',
        parameters: function parameters(settings) {
          return {
            api: settings.api,
            autoplay: settings.autoplay,
            byline: settings.brandedUI,
            color: settings.color || undefined,
            portrait: settings.brandedUI,
            title: settings.brandedUI
          };
        }
      }
    },
    templates: {
      iframe: function iframe(url, parameters) {
        var src = url;

        if (parameters) {
          src += '?' + parameters;
        }

        return '' + '<iframe src="' + src + '"' + ' width="100%" height="100%"' + ' frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
      },
      placeholder: function placeholder(image, icon) {
        var html = '';

        if (icon) {
          html += '<i class="' + icon + ' icon"></i>';
        }

        if (image) {
          html += '<img class="placeholder" src="' + image + '">';
        }

        return html;
      }
    },
    // NOT YET IMPLEMENTED
    api: false,
    onPause: function onPause() {},
    onPlay: function onPlay() {},
    onStop: function onStop() {}
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Modal
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.modal = function (parameters) {
    var $allModules = $(this),
        $window = $(window),
        $document = $(document),
        $body = $('body'),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      setTimeout(callback, 0);
    },
        returnedValue;

    $allModules.each(function () {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.modal.settings, parameters) : $.extend({}, $.fn.modal.settings),
          selector = settings.selector,
          className = settings.className,
          namespace = settings.namespace,
          error = settings.error,
          eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          $module = $(this),
          $context = $(settings.context),
          $close = $module.find(selector.close),
          $allModals,
          $otherModals,
          $focusedElement,
          $dimmable,
          $dimmer,
          element = this,
          instance = $module.data(moduleNamespace),
          ignoreRepeatedEvents = false,
          elementEventNamespace,
          _id2,
          observer,
          module;

      module = {
        initialize: function initialize() {
          module.verbose('Initializing dimmer', $context);
          module.create.id();
          module.create.dimmer();
          module.refreshModals();
          module.bind.events();

          if (settings.observeChanges) {
            module.observeChanges();
          }

          module.instantiate();
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance of modal');
          instance = module;
          $module.data(moduleNamespace, instance);
        },
        create: {
          dimmer: function dimmer() {
            var defaultSettings = {
              debug: settings.debug,
              variation: settings.centered ? false : 'top aligned',
              dimmerName: 'modals'
            },
                dimmerSettings = $.extend(true, defaultSettings, settings.dimmerSettings);

            if ($.fn.dimmer === undefined) {
              module.error(error.dimmer);
              return;
            }

            module.debug('Creating dimmer');
            $dimmable = $context.dimmer(dimmerSettings);

            if (settings.detachable) {
              module.verbose('Modal is detachable, moving content into dimmer');
              $dimmable.dimmer('add content', $module);
            } else {
              module.set.undetached();
            }

            $dimmer = $dimmable.dimmer('get dimmer');
          },
          id: function id() {
            _id2 = (Math.random().toString(16) + '000000000').substr(2, 8);
            elementEventNamespace = '.' + _id2;
            module.verbose('Creating unique id for element', _id2);
          }
        },
        destroy: function destroy() {
          module.verbose('Destroying previous modal');
          $module.removeData(moduleNamespace).off(eventNamespace);
          $window.off(elementEventNamespace);
          $dimmer.off(elementEventNamespace);
          $close.off(eventNamespace);
          $context.dimmer('destroy');
        },
        observeChanges: function observeChanges() {
          if ('MutationObserver' in window) {
            observer = new MutationObserver(function (mutations) {
              module.debug('DOM tree modified, refreshing');
              module.refresh();
            });
            observer.observe(element, {
              childList: true,
              subtree: true
            });
            module.debug('Setting up mutation observer', observer);
          }
        },
        refresh: function refresh() {
          module.remove.scrolling();
          module.cacheSizes();

          if (!module.can.useFlex()) {
            module.set.modalOffset();
          }

          module.set.screenHeight();
          module.set.type();
        },
        refreshModals: function refreshModals() {
          $otherModals = $module.siblings(selector.modal);
          $allModals = $otherModals.add($module);
        },
        attachEvents: function attachEvents(selector, event) {
          var $toggle = $(selector);
          event = $.isFunction(module[event]) ? module[event] : module.toggle;

          if ($toggle.length > 0) {
            module.debug('Attaching modal events to element', selector, event);
            $toggle.off(eventNamespace).on('click' + eventNamespace, event);
          } else {
            module.error(error.notFound, selector);
          }
        },
        bind: {
          events: function events() {
            module.verbose('Attaching events');
            $module.on('click' + eventNamespace, selector.close, module.event.close).on('click' + eventNamespace, selector.approve, module.event.approve).on('click' + eventNamespace, selector.deny, module.event.deny);
            $window.on('resize' + elementEventNamespace, module.event.resize);
          },
          scrollLock: function scrollLock() {
            // touch events default to passive, due to changes in chrome to optimize mobile perf
            $dimmable.get(0).addEventListener('touchmove', module.event.preventScroll, {
              passive: false
            });
          }
        },
        unbind: {
          scrollLock: function scrollLock() {
            $dimmable.get(0).removeEventListener('touchmove', module.event.preventScroll, {
              passive: false
            });
          }
        },
        get: {
          id: function id() {
            return (Math.random().toString(16) + '000000000').substr(2, 8);
          }
        },
        event: {
          approve: function approve() {
            if (ignoreRepeatedEvents || settings.onApprove.call(element, $(this)) === false) {
              module.verbose('Approve callback returned false cancelling hide');
              return;
            }

            ignoreRepeatedEvents = true;
            module.hide(function () {
              ignoreRepeatedEvents = false;
            });
          },
          preventScroll: function preventScroll(event) {
            event.preventDefault();
          },
          deny: function deny() {
            if (ignoreRepeatedEvents || settings.onDeny.call(element, $(this)) === false) {
              module.verbose('Deny callback returned false cancelling hide');
              return;
            }

            ignoreRepeatedEvents = true;
            module.hide(function () {
              ignoreRepeatedEvents = false;
            });
          },
          close: function close() {
            module.hide();
          },
          click: function click(event) {
            if (!settings.closable) {
              module.verbose('Dimmer clicked but closable setting is disabled');
              return;
            }

            var $target = $(event.target),
                isInModal = $target.closest(selector.modal).length > 0,
                isInDOM = $.contains(document.documentElement, event.target);

            if (!isInModal && isInDOM && module.is.active()) {
              module.debug('Dimmer clicked, hiding all modals');
              module.remove.clickaway();

              if (settings.allowMultiple) {
                module.hide();
              } else {
                module.hideAll();
              }
            }
          },
          debounce: function debounce(method, delay) {
            clearTimeout(module.timer);
            module.timer = setTimeout(method, delay);
          },
          keyboard: function keyboard(event) {
            var keyCode = event.which,
                escapeKey = 27;

            if (keyCode == escapeKey) {
              if (settings.closable) {
                module.debug('Escape key pressed hiding modal');
                module.hide();
              } else {
                module.debug('Escape key pressed, but closable is set to false');
              }

              event.preventDefault();
            }
          },
          resize: function resize() {
            if ($dimmable.dimmer('is active') && (module.is.animating() || module.is.active())) {
              requestAnimationFrame(module.refresh);
            }
          }
        },
        toggle: function toggle() {
          if (module.is.active() || module.is.animating()) {
            module.hide();
          } else {
            module.show();
          }
        },
        show: function show(callback) {
          callback = $.isFunction(callback) ? callback : function () {};
          module.refreshModals();
          module.set.dimmerSettings();
          module.set.dimmerStyles();
          module.showModal(callback);
        },
        hide: function hide(callback) {
          callback = $.isFunction(callback) ? callback : function () {};
          module.refreshModals();
          module.hideModal(callback);
        },
        showModal: function showModal(callback) {
          callback = $.isFunction(callback) ? callback : function () {};

          if (module.is.animating() || !module.is.active()) {
            module.showDimmer();
            module.cacheSizes();

            if (module.can.useFlex()) {
              module.remove.legacy();
            } else {
              module.set.legacy();
              module.set.modalOffset();
              module.debug('Using non-flex legacy modal positioning.');
            }

            module.set.screenHeight();
            module.set.type();
            module.set.clickaway();

            if (!settings.allowMultiple && module.others.active()) {
              module.hideOthers(module.showModal);
            } else {
              if (settings.allowMultiple && settings.detachable) {
                $module.detach().appendTo($dimmer);
              }

              settings.onShow.call(element);

              if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                module.debug('Showing modal with css animations');
                $module.transition({
                  debug: settings.debug,
                  animation: settings.transition + ' in',
                  queue: settings.queue,
                  duration: settings.duration,
                  useFailSafe: true,
                  onComplete: function onComplete() {
                    settings.onVisible.apply(element);

                    if (settings.keyboardShortcuts) {
                      module.add.keyboardShortcuts();
                    }

                    module.save.focus();
                    module.set.active();

                    if (settings.autofocus) {
                      module.set.autofocus();
                    }

                    callback();
                  }
                });
              } else {
                module.error(error.noTransition);
              }
            }
          } else {
            module.debug('Modal is already visible');
          }
        },
        hideModal: function hideModal(callback, keepDimmed) {
          callback = $.isFunction(callback) ? callback : function () {};
          module.debug('Hiding modal');

          if (settings.onHide.call(element, $(this)) === false) {
            module.verbose('Hide callback returned false cancelling hide');
            return;
          }

          if (module.is.animating() || module.is.active()) {
            if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              module.remove.active();
              $module.transition({
                debug: settings.debug,
                animation: settings.transition + ' out',
                queue: settings.queue,
                duration: settings.duration,
                useFailSafe: true,
                onStart: function onStart() {
                  if (!module.others.active() && !keepDimmed) {
                    module.hideDimmer();
                  }

                  if (settings.keyboardShortcuts) {
                    module.remove.keyboardShortcuts();
                  }
                },
                onComplete: function onComplete() {
                  settings.onHidden.call(element);
                  module.remove.dimmerStyles();
                  module.restore.focus();
                  callback();
                }
              });
            } else {
              module.error(error.noTransition);
            }
          }
        },
        showDimmer: function showDimmer() {
          if ($dimmable.dimmer('is animating') || !$dimmable.dimmer('is active')) {
            module.debug('Showing dimmer');
            $dimmable.dimmer('show');
          } else {
            module.debug('Dimmer already visible');
          }
        },
        hideDimmer: function hideDimmer() {
          if ($dimmable.dimmer('is animating') || $dimmable.dimmer('is active')) {
            module.unbind.scrollLock();
            $dimmable.dimmer('hide', function () {
              module.remove.clickaway();
              module.remove.screenHeight();
            });
          } else {
            module.debug('Dimmer is not visible cannot hide');
            return;
          }
        },
        hideAll: function hideAll(callback) {
          var $visibleModals = $allModals.filter('.' + className.active + ', .' + className.animating);
          callback = $.isFunction(callback) ? callback : function () {};

          if ($visibleModals.length > 0) {
            module.debug('Hiding all visible modals');
            module.hideDimmer();
            $visibleModals.modal('hide modal', callback);
          }
        },
        hideOthers: function hideOthers(callback) {
          var $visibleModals = $otherModals.filter('.' + className.active + ', .' + className.animating);
          callback = $.isFunction(callback) ? callback : function () {};

          if ($visibleModals.length > 0) {
            module.debug('Hiding other modals', $otherModals);
            $visibleModals.modal('hide modal', callback, true);
          }
        },
        others: {
          active: function active() {
            return $otherModals.filter('.' + className.active).length > 0;
          },
          animating: function animating() {
            return $otherModals.filter('.' + className.animating).length > 0;
          }
        },
        add: {
          keyboardShortcuts: function keyboardShortcuts() {
            module.verbose('Adding keyboard shortcuts');
            $document.on('keyup' + eventNamespace, module.event.keyboard);
          }
        },
        save: {
          focus: function focus() {
            var $activeElement = $(document.activeElement),
                inCurrentModal = $activeElement.closest($module).length > 0;

            if (!inCurrentModal) {
              $focusedElement = $(document.activeElement).blur();
            }
          }
        },
        restore: {
          focus: function focus() {
            if ($focusedElement && $focusedElement.length > 0) {
              $focusedElement.focus();
            }
          }
        },
        remove: {
          active: function active() {
            $module.removeClass(className.active);
          },
          legacy: function legacy() {
            $module.removeClass(className.legacy);
          },
          clickaway: function clickaway() {
            $dimmer.off('click' + elementEventNamespace);
          },
          dimmerStyles: function dimmerStyles() {
            $dimmer.removeClass(className.inverted);
            $dimmable.removeClass(className.blurring);
          },
          bodyStyle: function bodyStyle() {
            if ($body.attr('style') === '') {
              module.verbose('Removing style attribute');
              $body.removeAttr('style');
            }
          },
          screenHeight: function screenHeight() {
            module.debug('Removing page height');
            $body.css('height', '');
          },
          keyboardShortcuts: function keyboardShortcuts() {
            module.verbose('Removing keyboard shortcuts');
            $document.off('keyup' + eventNamespace);
          },
          scrolling: function scrolling() {
            $dimmable.removeClass(className.scrolling);
            $module.removeClass(className.scrolling);
          }
        },
        cacheSizes: function cacheSizes() {
          $module.addClass(className.loading);
          var scrollHeight = $module.prop('scrollHeight'),
              modalWidth = $module.outerWidth(),
              modalHeight = $module.outerHeight();

          if (module.cache === undefined || modalHeight !== 0) {
            module.cache = {
              pageHeight: $(document).outerHeight(),
              width: modalWidth,
              height: modalHeight + settings.offset,
              scrollHeight: scrollHeight + settings.offset,
              contextHeight: settings.context == 'body' ? $(window).height() : $dimmable.height()
            };
            module.cache.topOffset = -(module.cache.height / 2);
          }

          $module.removeClass(className.loading);
          module.debug('Caching modal and container sizes', module.cache);
        },
        can: {
          useFlex: function useFlex() {
            return settings.useFlex == 'auto' ? settings.detachable && !module.is.ie() : settings.useFlex;
          },
          fit: function fit() {
            var contextHeight = module.cache.contextHeight,
                verticalCenter = module.cache.contextHeight / 2,
                topOffset = module.cache.topOffset,
                scrollHeight = module.cache.scrollHeight,
                height = module.cache.height,
                paddingHeight = settings.padding,
                startPosition = verticalCenter + topOffset;
            return scrollHeight > height ? startPosition + scrollHeight + paddingHeight < contextHeight : height + paddingHeight * 2 < contextHeight;
          }
        },
        is: {
          active: function active() {
            return $module.hasClass(className.active);
          },
          ie: function ie() {
            var isIE11 = !window.ActiveXObject && 'ActiveXObject' in window,
                isIE = 'ActiveXObject' in window;
            return isIE11 || isIE;
          },
          animating: function animating() {
            return $module.transition('is supported') ? $module.transition('is animating') : $module.is(':visible');
          },
          scrolling: function scrolling() {
            return $dimmable.hasClass(className.scrolling);
          },
          modernBrowser: function modernBrowser() {
            // appName for IE11 reports 'Netscape' can no longer use
            return !(window.ActiveXObject || 'ActiveXObject' in window);
          }
        },
        set: {
          autofocus: function autofocus() {
            var $inputs = $module.find('[tabindex], :input').filter(':visible'),
                $autofocus = $inputs.filter('[autofocus]'),
                $input = $autofocus.length > 0 ? $autofocus.first() : $inputs.first();

            if ($input.length > 0) {
              $input.focus();
            }
          },
          clickaway: function clickaway() {
            $dimmer.on('click' + elementEventNamespace, module.event.click);
          },
          dimmerSettings: function dimmerSettings() {
            if ($.fn.dimmer === undefined) {
              module.error(error.dimmer);
              return;
            }

            var defaultSettings = {
              debug: settings.debug,
              dimmerName: 'modals',
              closable: 'auto',
              useFlex: module.can.useFlex(),
              variation: settings.centered ? false : 'top aligned',
              duration: {
                show: settings.duration,
                hide: settings.duration
              }
            },
                dimmerSettings = $.extend(true, defaultSettings, settings.dimmerSettings);

            if (settings.inverted) {
              dimmerSettings.variation = dimmerSettings.variation !== undefined ? dimmerSettings.variation + ' inverted' : 'inverted';
            }

            $context.dimmer('setting', dimmerSettings);
          },
          dimmerStyles: function dimmerStyles() {
            if (settings.inverted) {
              $dimmer.addClass(className.inverted);
            } else {
              $dimmer.removeClass(className.inverted);
            }

            if (settings.blurring) {
              $dimmable.addClass(className.blurring);
            } else {
              $dimmable.removeClass(className.blurring);
            }
          },
          modalOffset: function modalOffset() {
            var width = module.cache.width,
                height = module.cache.height;
            $module.css({
              marginTop: settings.centered && module.can.fit() ? -(height / 2) : 0,
              marginLeft: -(width / 2)
            });
            module.verbose('Setting modal offset for legacy mode');
          },
          screenHeight: function screenHeight() {
            if (module.can.fit()) {
              $body.css('height', '');
            } else {
              module.debug('Modal is taller than page content, resizing page height');
              $body.css('height', module.cache.height + settings.padding * 2);
            }
          },
          active: function active() {
            $module.addClass(className.active);
          },
          scrolling: function scrolling() {
            $dimmable.addClass(className.scrolling);
            $module.addClass(className.scrolling);
            module.unbind.scrollLock();
          },
          legacy: function legacy() {
            $module.addClass(className.legacy);
          },
          type: function type() {
            if (module.can.fit()) {
              module.verbose('Modal fits on screen');

              if (!module.others.active() && !module.others.animating()) {
                module.remove.scrolling();
                module.bind.scrollLock();
              }
            } else {
              module.verbose('Modal cannot fit on screen setting to scrolling');
              module.set.scrolling();
            }
          },
          undetached: function undetached() {
            $dimmable.addClass(className.undetached);
          }
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.modal.settings = {
    name: 'Modal',
    namespace: 'modal',
    useFlex: 'auto',
    offset: 0,
    silent: false,
    debug: false,
    verbose: false,
    performance: true,
    observeChanges: false,
    allowMultiple: false,
    detachable: true,
    closable: true,
    autofocus: true,
    inverted: false,
    blurring: false,
    centered: true,
    dimmerSettings: {
      closable: false,
      useCSS: true
    },
    // whether to use keyboard shortcuts
    keyboardShortcuts: true,
    context: 'body',
    queue: false,
    duration: 500,
    transition: 'scale',
    // padding with edge of page
    padding: 50,
    // called before show animation
    onShow: function onShow() {},
    // called after show animation
    onVisible: function onVisible() {},
    // called before hide animation
    onHide: function onHide() {
      return true;
    },
    // called after hide animation
    onHidden: function onHidden() {},
    // called after approve selector match
    onApprove: function onApprove() {
      return true;
    },
    // called after deny selector match
    onDeny: function onDeny() {
      return true;
    },
    selector: {
      close: '> .close',
      approve: '.actions .positive, .actions .approve, .actions .ok',
      deny: '.actions .negative, .actions .deny, .actions .cancel',
      modal: '.ui.modal'
    },
    error: {
      dimmer: 'UI Dimmer, a required component is not included in this page',
      method: 'The method you called is not defined.',
      notFound: 'The element you specified could not be found'
    },
    className: {
      active: 'active',
      animating: 'animating',
      blurring: 'blurring',
      inverted: 'inverted',
      legacy: 'legacy',
      loading: 'loading',
      scrolling: 'scrolling',
      undetached: 'undetached'
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Nag
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.nag = function (parameters) {
    var $allModules = $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;
    $allModules.each(function () {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.nag.settings, parameters) : $.extend({}, $.fn.nag.settings),
          className = settings.className,
          selector = settings.selector,
          error = settings.error,
          namespace = settings.namespace,
          eventNamespace = '.' + namespace,
          moduleNamespace = namespace + '-module',
          $module = $(this),
          $close = $module.find(selector.close),
          $context = settings.context ? $(settings.context) : $('body'),
          element = this,
          instance = $module.data(moduleNamespace),
          moduleOffset,
          moduleHeight,
          contextWidth,
          contextHeight,
          contextOffset,
          yOffset,
          yPosition,
          timer,
          module,
          requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        setTimeout(callback, 0);
      };

      module = {
        initialize: function initialize() {
          module.verbose('Initializing element');
          $module.on('click' + eventNamespace, selector.close, module.dismiss).data(moduleNamespace, module);

          if (settings.detachable && $module.parent()[0] !== $context[0]) {
            $module.detach().prependTo($context);
          }

          if (settings.displayTime > 0) {
            setTimeout(module.hide, settings.displayTime);
          }

          module.show();
        },
        destroy: function destroy() {
          module.verbose('Destroying instance');
          $module.removeData(moduleNamespace).off(eventNamespace);
        },
        show: function show() {
          if (module.should.show() && !$module.is(':visible')) {
            module.debug('Showing nag', settings.animation.show);

            if (settings.animation.show == 'fade') {
              $module.fadeIn(settings.duration, settings.easing);
            } else {
              $module.slideDown(settings.duration, settings.easing);
            }
          }
        },
        hide: function hide() {
          module.debug('Showing nag', settings.animation.hide);

          if (settings.animation.show == 'fade') {
            $module.fadeIn(settings.duration, settings.easing);
          } else {
            $module.slideUp(settings.duration, settings.easing);
          }
        },
        onHide: function onHide() {
          module.debug('Removing nag', settings.animation.hide);
          $module.remove();

          if (settings.onHide) {
            settings.onHide();
          }
        },
        dismiss: function dismiss(event) {
          if (settings.storageMethod) {
            module.storage.set(settings.key, settings.value);
          }

          module.hide();
          event.stopImmediatePropagation();
          event.preventDefault();
        },
        should: {
          show: function show() {
            if (settings.persist) {
              module.debug('Persistent nag is set, can show nag');
              return true;
            }

            if (module.storage.get(settings.key) != settings.value.toString()) {
              module.debug('Stored value is not set, can show nag', module.storage.get(settings.key));
              return true;
            }

            module.debug('Stored value is set, cannot show nag', module.storage.get(settings.key));
            return false;
          }
        },
        get: {
          storageOptions: function storageOptions() {
            var options = {};

            if (settings.expires) {
              options.expires = settings.expires;
            }

            if (settings.domain) {
              options.domain = settings.domain;
            }

            if (settings.path) {
              options.path = settings.path;
            }

            return options;
          }
        },
        clear: function clear() {
          module.storage.remove(settings.key);
        },
        storage: {
          set: function set(key, value) {
            var options = module.get.storageOptions();

            if (settings.storageMethod == 'localstorage' && window.localStorage !== undefined) {
              window.localStorage.setItem(key, value);
              module.debug('Value stored using local storage', key, value);
            } else if (settings.storageMethod == 'sessionstorage' && window.sessionStorage !== undefined) {
              window.sessionStorage.setItem(key, value);
              module.debug('Value stored using session storage', key, value);
            } else if ($.cookie !== undefined) {
              $.cookie(key, value, options);
              module.debug('Value stored using cookie', key, value, options);
            } else {
              module.error(error.noCookieStorage);
              return;
            }
          },
          get: function get(key, value) {
            var storedValue;

            if (settings.storageMethod == 'localstorage' && window.localStorage !== undefined) {
              storedValue = window.localStorage.getItem(key);
            } else if (settings.storageMethod == 'sessionstorage' && window.sessionStorage !== undefined) {
              storedValue = window.sessionStorage.getItem(key);
            } // get by cookie
            else if ($.cookie !== undefined) {
                storedValue = $.cookie(key);
              } else {
                module.error(error.noCookieStorage);
              }

            if (storedValue == 'undefined' || storedValue == 'null' || storedValue === undefined || storedValue === null) {
              storedValue = undefined;
            }

            return storedValue;
          },
          remove: function remove(key) {
            var options = module.get.storageOptions();

            if (settings.storageMethod == 'localstorage' && window.localStorage !== undefined) {
              window.localStorage.removeItem(key);
            } else if (settings.storageMethod == 'sessionstorage' && window.sessionStorage !== undefined) {
              window.sessionStorage.removeItem(key);
            } // store by cookie
            else if ($.cookie !== undefined) {
                $.removeCookie(key, options);
              } else {
                module.error(error.noStorage);
              }
          }
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                module.error(error.method, query);
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.nag.settings = {
    name: 'Nag',
    silent: false,
    debug: false,
    verbose: false,
    performance: true,
    namespace: 'Nag',
    // allows cookie to be overridden
    persist: false,
    // set to zero to require manually dismissal, otherwise hides on its own
    displayTime: 0,
    animation: {
      show: 'slide',
      hide: 'slide'
    },
    context: false,
    detachable: false,
    expires: 30,
    domain: false,
    path: '/',
    // type of storage to use
    storageMethod: 'cookie',
    // value to store in dismissed localstorage/cookie
    key: 'nag',
    value: 'dismiss',
    error: {
      noCookieStorage: '$.cookie is not included. A storage solution is required.',
      noStorage: 'Neither $.cookie or store is defined. A storage solution is required for storing state',
      method: 'The method you called is not defined.'
    },
    className: {
      bottom: 'bottom',
      fixed: 'fixed'
    },
    selector: {
      close: '.close.icon'
    },
    speed: 500,
    easing: 'easeOutQuad',
    onHide: function onHide() {}
  }; // Adds easing

  $.extend($.easing, {
    easeOutQuad: function easeOutQuad(x, t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    }
  });
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Popup
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.popup = function (parameters) {
    var $allModules = $(this),
        $document = $(document),
        $window = $(window),
        $body = $('body'),
        moduleSelector = $allModules.selector || '',
        hasTouch = true,
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;
    $allModules.each(function () {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.popup.settings, parameters) : $.extend({}, $.fn.popup.settings),
          selector = settings.selector,
          className = settings.className,
          error = settings.error,
          metadata = settings.metadata,
          namespace = settings.namespace,
          eventNamespace = '.' + settings.namespace,
          moduleNamespace = 'module-' + namespace,
          $module = $(this),
          $context = $(settings.context),
          $scrollContext = $(settings.scrollContext),
          $boundary = $(settings.boundary),
          $target = settings.target ? $(settings.target) : $module,
          $popup,
          $offsetParent,
          searchDepth = 0,
          triedPositions = false,
          openedWithTouch = false,
          element = this,
          instance = $module.data(moduleNamespace),
          documentObserver,
          elementNamespace,
          _id3,
          module;

      module = {
        // binds events
        initialize: function initialize() {
          module.debug('Initializing', $module);
          module.createID();
          module.bind.events();

          if (!module.exists() && settings.preserve) {
            module.create();
          }

          if (settings.observeChanges) {
            module.observeChanges();
          }

          module.instantiate();
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance', module);
          instance = module;
          $module.data(moduleNamespace, instance);
        },
        observeChanges: function observeChanges() {
          if ('MutationObserver' in window) {
            documentObserver = new MutationObserver(module.event.documentChanged);
            documentObserver.observe(document, {
              childList: true,
              subtree: true
            });
            module.debug('Setting up mutation observer', documentObserver);
          }
        },
        refresh: function refresh() {
          if (settings.popup) {
            $popup = $(settings.popup).eq(0);
          } else {
            if (settings.inline) {
              $popup = $target.nextAll(selector.popup).eq(0);
              settings.popup = $popup;
            }
          }

          if (settings.popup) {
            $popup.addClass(className.loading);
            $offsetParent = module.get.offsetParent();
            $popup.removeClass(className.loading);

            if (settings.movePopup && module.has.popup() && module.get.offsetParent($popup)[0] !== $offsetParent[0]) {
              module.debug('Moving popup to the same offset parent as target');
              $popup.detach().appendTo($offsetParent);
            }
          } else {
            $offsetParent = settings.inline ? module.get.offsetParent($target) : module.has.popup() ? module.get.offsetParent($popup) : $body;
          }

          if ($offsetParent.is('html') && $offsetParent[0] !== $body[0]) {
            module.debug('Setting page as offset parent');
            $offsetParent = $body;
          }

          if (module.get.variation()) {
            module.set.variation();
          }
        },
        reposition: function reposition() {
          module.refresh();
          module.set.position();
        },
        destroy: function destroy() {
          module.debug('Destroying previous module');

          if (documentObserver) {
            documentObserver.disconnect();
          } // remove element only if was created dynamically


          if ($popup && !settings.preserve) {
            module.removePopup();
          } // clear all timeouts


          clearTimeout(module.hideTimer);
          clearTimeout(module.showTimer); // remove events

          module.unbind.close();
          module.unbind.events();
          $module.removeData(moduleNamespace);
        },
        event: {
          start: function start(event) {
            var delay = $.isPlainObject(settings.delay) ? settings.delay.show : settings.delay;
            clearTimeout(module.hideTimer);

            if (!openedWithTouch) {
              module.showTimer = setTimeout(module.show, delay);
            }
          },
          end: function end() {
            var delay = $.isPlainObject(settings.delay) ? settings.delay.hide : settings.delay;
            clearTimeout(module.showTimer);
            module.hideTimer = setTimeout(module.hide, delay);
          },
          touchstart: function touchstart(event) {
            openedWithTouch = true;
            module.show();
          },
          resize: function resize() {
            if (module.is.visible()) {
              module.set.position();
            }
          },
          documentChanged: function documentChanged(mutations) {
            [].forEach.call(mutations, function (mutation) {
              if (mutation.removedNodes) {
                [].forEach.call(mutation.removedNodes, function (node) {
                  if (node == element || $(node).find(element).length > 0) {
                    module.debug('Element removed from DOM, tearing down events');
                    module.destroy();
                  }
                });
              }
            });
          },
          hideGracefully: function hideGracefully(event) {
            var $target = $(event.target),
                isInDOM = $.contains(document.documentElement, event.target),
                inPopup = $target.closest(selector.popup).length > 0; // don't close on clicks inside popup

            if (event && !inPopup && isInDOM) {
              module.debug('Click occurred outside popup hiding popup');
              module.hide();
            } else {
              module.debug('Click was inside popup, keeping popup open');
            }
          }
        },
        // generates popup html from metadata
        create: function create() {
          var html = module.get.html(),
              title = module.get.title(),
              content = module.get.content();

          if (html || content || title) {
            module.debug('Creating pop-up html');

            if (!html) {
              html = settings.templates.popup({
                title: title,
                content: content
              });
            }

            $popup = $('<div/>').addClass(className.popup).data(metadata.activator, $module).html(html);

            if (settings.inline) {
              module.verbose('Inserting popup element inline', $popup);
              $popup.insertAfter($module);
            } else {
              module.verbose('Appending popup element to body', $popup);
              $popup.appendTo($context);
            }

            module.refresh();
            module.set.variation();

            if (settings.hoverable) {
              module.bind.popup();
            }

            settings.onCreate.call($popup, element);
          } else if ($target.next(selector.popup).length !== 0) {
            module.verbose('Pre-existing popup found');
            settings.inline = true;
            settings.popup = $target.next(selector.popup).data(metadata.activator, $module);
            module.refresh();

            if (settings.hoverable) {
              module.bind.popup();
            }
          } else if (settings.popup) {
            $(settings.popup).data(metadata.activator, $module);
            module.verbose('Used popup specified in settings');
            module.refresh();

            if (settings.hoverable) {
              module.bind.popup();
            }
          } else {
            module.debug('No content specified skipping display', element);
          }
        },
        createID: function createID() {
          _id3 = (Math.random().toString(16) + '000000000').substr(2, 8);
          elementNamespace = '.' + _id3;
          module.verbose('Creating unique id for element', _id3);
        },
        // determines popup state
        toggle: function toggle() {
          module.debug('Toggling pop-up');

          if (module.is.hidden()) {
            module.debug('Popup is hidden, showing pop-up');
            module.unbind.close();
            module.show();
          } else {
            module.debug('Popup is visible, hiding pop-up');
            module.hide();
          }
        },
        show: function show(callback) {
          callback = callback || function () {};

          module.debug('Showing pop-up', settings.transition);

          if (module.is.hidden() && !(module.is.active() && module.is.dropdown())) {
            if (!module.exists()) {
              module.create();
            }

            if (settings.onShow.call($popup, element) === false) {
              module.debug('onShow callback returned false, cancelling popup animation');
              return;
            } else if (!settings.preserve && !settings.popup) {
              module.refresh();
            }

            if ($popup && module.set.position()) {
              module.save.conditions();

              if (settings.exclusive) {
                module.hideAll();
              }

              module.animate.show(callback);
            }
          }
        },
        hide: function hide(callback) {
          callback = callback || function () {};

          if (module.is.visible() || module.is.animating()) {
            if (settings.onHide.call($popup, element) === false) {
              module.debug('onHide callback returned false, cancelling popup animation');
              return;
            }

            module.remove.visible();
            module.unbind.close();
            module.restore.conditions();
            module.animate.hide(callback);
          }
        },
        hideAll: function hideAll() {
          $(selector.popup).filter('.' + className.popupVisible).each(function () {
            $(this).data(metadata.activator).popup('hide');
          });
        },
        exists: function exists() {
          if (!$popup) {
            return false;
          }

          if (settings.inline || settings.popup) {
            return module.has.popup();
          } else {
            return $popup.closest($context).length >= 1 ? true : false;
          }
        },
        removePopup: function removePopup() {
          if (module.has.popup() && !settings.popup) {
            module.debug('Removing popup', $popup);
            $popup.remove();
            $popup = undefined;
            settings.onRemove.call($popup, element);
          }
        },
        save: {
          conditions: function conditions() {
            module.cache = {
              title: $module.attr('title')
            };

            if (module.cache.title) {
              $module.removeAttr('title');
            }

            module.verbose('Saving original attributes', module.cache.title);
          }
        },
        restore: {
          conditions: function conditions() {
            if (module.cache && module.cache.title) {
              $module.attr('title', module.cache.title);
              module.verbose('Restoring original attributes', module.cache.title);
            }

            return true;
          }
        },
        supports: {
          svg: function svg() {
            return typeof SVGGraphicsElement === 'undefined';
          }
        },
        animate: {
          show: function show(callback) {
            callback = $.isFunction(callback) ? callback : function () {};

            if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              module.set.visible();
              $popup.transition({
                animation: settings.transition + ' in',
                queue: false,
                debug: settings.debug,
                verbose: settings.verbose,
                duration: settings.duration,
                onComplete: function onComplete() {
                  module.bind.close();
                  callback.call($popup, element);
                  settings.onVisible.call($popup, element);
                }
              });
            } else {
              module.error(error.noTransition);
            }
          },
          hide: function hide(callback) {
            callback = $.isFunction(callback) ? callback : function () {};
            module.debug('Hiding pop-up');

            if (settings.onHide.call($popup, element) === false) {
              module.debug('onHide callback returned false, cancelling popup animation');
              return;
            }

            if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
              $popup.transition({
                animation: settings.transition + ' out',
                queue: false,
                duration: settings.duration,
                debug: settings.debug,
                verbose: settings.verbose,
                onComplete: function onComplete() {
                  module.reset();
                  callback.call($popup, element);
                  settings.onHidden.call($popup, element);
                }
              });
            } else {
              module.error(error.noTransition);
            }
          }
        },
        change: {
          content: function content(html) {
            $popup.html(html);
          }
        },
        get: {
          html: function html() {
            $module.removeData(metadata.html);
            return $module.data(metadata.html) || settings.html;
          },
          title: function title() {
            $module.removeData(metadata.title);
            return $module.data(metadata.title) || settings.title;
          },
          content: function content() {
            $module.removeData(metadata.content);
            return $module.data(metadata.content) || settings.content || $module.attr('title');
          },
          variation: function variation() {
            $module.removeData(metadata.variation);
            return $module.data(metadata.variation) || settings.variation;
          },
          popup: function popup() {
            return $popup;
          },
          popupOffset: function popupOffset() {
            return $popup.offset();
          },
          calculations: function calculations() {
            var $popupOffsetParent = module.get.offsetParent($popup),
                targetElement = $target[0],
                isWindow = $boundary[0] == window,
                targetPosition = settings.inline || settings.popup && settings.movePopup ? $target.position() : $target.offset(),
                screenPosition = isWindow ? {
              top: 0,
              left: 0
            } : $boundary.offset(),
                calculations = {},
                scroll = isWindow ? {
              top: $window.scrollTop(),
              left: $window.scrollLeft()
            } : {
              top: 0,
              left: 0
            },
                screen;
            calculations = {
              // element which is launching popup
              target: {
                element: $target[0],
                width: $target.outerWidth(),
                height: $target.outerHeight(),
                top: targetPosition.top,
                left: targetPosition.left,
                margin: {}
              },
              // popup itself
              popup: {
                width: $popup.outerWidth(),
                height: $popup.outerHeight()
              },
              // offset container (or 3d context)
              parent: {
                width: $offsetParent.outerWidth(),
                height: $offsetParent.outerHeight()
              },
              // screen boundaries
              screen: {
                top: screenPosition.top,
                left: screenPosition.left,
                scroll: {
                  top: scroll.top,
                  left: scroll.left
                },
                width: $boundary.width(),
                height: $boundary.height()
              }
            }; // if popup offset context is not same as target, then adjust calculations

            if ($popupOffsetParent.get(0) !== $offsetParent.get(0)) {
              var popupOffset = $popupOffsetParent.offset();
              calculations.target.top -= popupOffset.top;
              calculations.target.left -= popupOffset.left;
              calculations.parent.width = $popupOffsetParent.outerWidth();
              calculations.parent.height = $popupOffsetParent.outerHeight();
            } // add in container calcs if fluid


            if (settings.setFluidWidth && module.is.fluid()) {
              calculations.container = {
                width: $popup.parent().outerWidth()
              };
              calculations.popup.width = calculations.container.width;
            } // add in margins if inline


            calculations.target.margin.top = settings.inline ? parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-top'), 10) : 0;
            calculations.target.margin.left = settings.inline ? module.is.rtl() ? parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-right'), 10) : parseInt(window.getComputedStyle(targetElement).getPropertyValue('margin-left'), 10) : 0; // calculate screen boundaries

            screen = calculations.screen;
            calculations.boundary = {
              top: screen.top + screen.scroll.top,
              bottom: screen.top + screen.scroll.top + screen.height,
              left: screen.left + screen.scroll.left,
              right: screen.left + screen.scroll.left + screen.width
            };
            return calculations;
          },
          id: function id() {
            return _id3;
          },
          startEvent: function startEvent() {
            if (settings.on == 'hover') {
              return 'mouseenter';
            } else if (settings.on == 'focus') {
              return 'focus';
            }

            return false;
          },
          scrollEvent: function scrollEvent() {
            return 'scroll';
          },
          endEvent: function endEvent() {
            if (settings.on == 'hover') {
              return 'mouseleave';
            } else if (settings.on == 'focus') {
              return 'blur';
            }

            return false;
          },
          distanceFromBoundary: function distanceFromBoundary(offset, calculations) {
            var distanceFromBoundary = {},
                popup,
                boundary;
            calculations = calculations || module.get.calculations(); // shorthand

            popup = calculations.popup;
            boundary = calculations.boundary;

            if (offset) {
              distanceFromBoundary = {
                top: offset.top - boundary.top,
                left: offset.left - boundary.left,
                right: boundary.right - (offset.left + popup.width),
                bottom: boundary.bottom - (offset.top + popup.height)
              };
              module.verbose('Distance from boundaries determined', offset, distanceFromBoundary);
            }

            return distanceFromBoundary;
          },
          offsetParent: function offsetParent($element) {
            var element = $element !== undefined ? $element[0] : $target[0],
                parentNode = element.parentNode,
                $node = $(parentNode);

            if (parentNode) {
              var is2D = $node.css('transform') === 'none',
                  isStatic = $node.css('position') === 'static',
                  isBody = $node.is('body');

              while (parentNode && !isBody && isStatic && is2D) {
                parentNode = parentNode.parentNode;
                $node = $(parentNode);
                is2D = $node.css('transform') === 'none';
                isStatic = $node.css('position') === 'static';
                isBody = $node.is('body');
              }
            }

            return $node && $node.length > 0 ? $node : $();
          },
          positions: function positions() {
            return {
              'top left': false,
              'top center': false,
              'top right': false,
              'bottom left': false,
              'bottom center': false,
              'bottom right': false,
              'left center': false,
              'right center': false
            };
          },
          nextPosition: function nextPosition(position) {
            var positions = position.split(' '),
                verticalPosition = positions[0],
                horizontalPosition = positions[1],
                opposite = {
              top: 'bottom',
              bottom: 'top',
              left: 'right',
              right: 'left'
            },
                adjacent = {
              left: 'center',
              center: 'right',
              right: 'left'
            },
                backup = {
              'top left': 'top center',
              'top center': 'top right',
              'top right': 'right center',
              'right center': 'bottom right',
              'bottom right': 'bottom center',
              'bottom center': 'bottom left',
              'bottom left': 'left center',
              'left center': 'top left'
            },
                adjacentsAvailable = verticalPosition == 'top' || verticalPosition == 'bottom',
                oppositeTried = false,
                adjacentTried = false,
                nextPosition = false;

            if (!triedPositions) {
              module.verbose('All available positions available');
              triedPositions = module.get.positions();
            }

            module.debug('Recording last position tried', position);
            triedPositions[position] = true;

            if (settings.prefer === 'opposite') {
              nextPosition = [opposite[verticalPosition], horizontalPosition];
              nextPosition = nextPosition.join(' ');
              oppositeTried = triedPositions[nextPosition] === true;
              module.debug('Trying opposite strategy', nextPosition);
            }

            if (settings.prefer === 'adjacent' && adjacentsAvailable) {
              nextPosition = [verticalPosition, adjacent[horizontalPosition]];
              nextPosition = nextPosition.join(' ');
              adjacentTried = triedPositions[nextPosition] === true;
              module.debug('Trying adjacent strategy', nextPosition);
            }

            if (adjacentTried || oppositeTried) {
              module.debug('Using backup position', nextPosition);
              nextPosition = backup[position];
            }

            return nextPosition;
          }
        },
        set: {
          position: function position(_position, calculations) {
            // exit conditions
            if ($target.length === 0 || $popup.length === 0) {
              module.error(error.notFound);
              return;
            }

            var offset, distanceAway, target, popup, parent, positioning, popupOffset, distanceFromBoundary;
            calculations = calculations || module.get.calculations();
            _position = _position || $module.data(metadata.position) || settings.position;
            offset = $module.data(metadata.offset) || settings.offset;
            distanceAway = settings.distanceAway; // shorthand

            target = calculations.target;
            popup = calculations.popup;
            parent = calculations.parent;

            if (module.should.centerArrow(calculations)) {
              module.verbose('Adjusting offset to center arrow on small target element');

              if (_position == 'top left' || _position == 'bottom left') {
                offset += target.width / 2;
                offset -= settings.arrowPixelsFromEdge;
              }

              if (_position == 'top right' || _position == 'bottom right') {
                offset -= target.width / 2;
                offset += settings.arrowPixelsFromEdge;
              }
            }

            if (target.width === 0 && target.height === 0 && !module.is.svg(target.element)) {
              module.debug('Popup target is hidden, no action taken');
              return false;
            }

            if (settings.inline) {
              module.debug('Adding margin to calculation', target.margin);

              if (_position == 'left center' || _position == 'right center') {
                offset += target.margin.top;
                distanceAway += -target.margin.left;
              } else if (_position == 'top left' || _position == 'top center' || _position == 'top right') {
                offset += target.margin.left;
                distanceAway -= target.margin.top;
              } else {
                offset += target.margin.left;
                distanceAway += target.margin.top;
              }
            }

            module.debug('Determining popup position from calculations', _position, calculations);

            if (module.is.rtl()) {
              _position = _position.replace(/left|right/g, function (match) {
                return match == 'left' ? 'right' : 'left';
              });
              module.debug('RTL: Popup position updated', _position);
            } // if last attempt use specified last resort position


            if (searchDepth == settings.maxSearchDepth && typeof settings.lastResort === 'string') {
              _position = settings.lastResort;
            }

            switch (_position) {
              case 'top left':
                positioning = {
                  top: 'auto',
                  bottom: parent.height - target.top + distanceAway,
                  left: target.left + offset,
                  right: 'auto'
                };
                break;

              case 'top center':
                positioning = {
                  bottom: parent.height - target.top + distanceAway,
                  left: target.left + target.width / 2 - popup.width / 2 + offset,
                  top: 'auto',
                  right: 'auto'
                };
                break;

              case 'top right':
                positioning = {
                  bottom: parent.height - target.top + distanceAway,
                  right: parent.width - target.left - target.width - offset,
                  top: 'auto',
                  left: 'auto'
                };
                break;

              case 'left center':
                positioning = {
                  top: target.top + target.height / 2 - popup.height / 2 + offset,
                  right: parent.width - target.left + distanceAway,
                  left: 'auto',
                  bottom: 'auto'
                };
                break;

              case 'right center':
                positioning = {
                  top: target.top + target.height / 2 - popup.height / 2 + offset,
                  left: target.left + target.width + distanceAway,
                  bottom: 'auto',
                  right: 'auto'
                };
                break;

              case 'bottom left':
                positioning = {
                  top: target.top + target.height + distanceAway,
                  left: target.left + offset,
                  bottom: 'auto',
                  right: 'auto'
                };
                break;

              case 'bottom center':
                positioning = {
                  top: target.top + target.height + distanceAway,
                  left: target.left + target.width / 2 - popup.width / 2 + offset,
                  bottom: 'auto',
                  right: 'auto'
                };
                break;

              case 'bottom right':
                positioning = {
                  top: target.top + target.height + distanceAway,
                  right: parent.width - target.left - target.width - offset,
                  left: 'auto',
                  bottom: 'auto'
                };
                break;
            }

            if (positioning === undefined) {
              module.error(error.invalidPosition, _position);
            }

            module.debug('Calculated popup positioning values', positioning); // tentatively place on stage

            $popup.css(positioning).removeClass(className.position).addClass(_position).addClass(className.loading);
            popupOffset = module.get.popupOffset(); // see if any boundaries are surpassed with this tentative position

            distanceFromBoundary = module.get.distanceFromBoundary(popupOffset, calculations);

            if (module.is.offstage(distanceFromBoundary, _position)) {
              module.debug('Position is outside viewport', _position);

              if (searchDepth < settings.maxSearchDepth) {
                searchDepth++;
                _position = module.get.nextPosition(_position);
                module.debug('Trying new position', _position);
                return $popup ? module.set.position(_position, calculations) : false;
              } else {
                if (settings.lastResort) {
                  module.debug('No position found, showing with last position');
                } else {
                  module.debug('Popup could not find a position to display', $popup);
                  module.error(error.cannotPlace, element);
                  module.remove.attempts();
                  module.remove.loading();
                  module.reset();
                  settings.onUnplaceable.call($popup, element);
                  return false;
                }
              }
            }

            module.debug('Position is on stage', _position);
            module.remove.attempts();
            module.remove.loading();

            if (settings.setFluidWidth && module.is.fluid()) {
              module.set.fluidWidth(calculations);
            }

            return true;
          },
          fluidWidth: function fluidWidth(calculations) {
            calculations = calculations || module.get.calculations();
            module.debug('Automatically setting element width to parent width', calculations.parent.width);
            $popup.css('width', calculations.container.width);
          },
          variation: function variation(_variation3) {
            _variation3 = _variation3 || module.get.variation();

            if (_variation3 && module.has.popup()) {
              module.verbose('Adding variation to popup', _variation3);
              $popup.addClass(_variation3);
            }
          },
          visible: function visible() {
            $module.addClass(className.visible);
          }
        },
        remove: {
          loading: function loading() {
            $popup.removeClass(className.loading);
          },
          variation: function variation(_variation4) {
            _variation4 = _variation4 || module.get.variation();

            if (_variation4) {
              module.verbose('Removing variation', _variation4);
              $popup.removeClass(_variation4);
            }
          },
          visible: function visible() {
            $module.removeClass(className.visible);
          },
          attempts: function attempts() {
            module.verbose('Resetting all searched positions');
            searchDepth = 0;
            triedPositions = false;
          }
        },
        bind: {
          events: function events() {
            module.debug('Binding popup events to module');

            if (settings.on == 'click') {
              $module.on('click' + eventNamespace, module.toggle);
            }

            if (settings.on == 'hover' && hasTouch) {
              $module.on('touchstart' + eventNamespace, module.event.touchstart);
            }

            if (module.get.startEvent()) {
              $module.on(module.get.startEvent() + eventNamespace, module.event.start).on(module.get.endEvent() + eventNamespace, module.event.end);
            }

            if (settings.target) {
              module.debug('Target set to element', $target);
            }

            $window.on('resize' + elementNamespace, module.event.resize);
          },
          popup: function popup() {
            module.verbose('Allowing hover events on popup to prevent closing');

            if ($popup && module.has.popup()) {
              $popup.on('mouseenter' + eventNamespace, module.event.start).on('mouseleave' + eventNamespace, module.event.end);
            }
          },
          close: function close() {
            if (settings.hideOnScroll === true || settings.hideOnScroll == 'auto' && settings.on != 'click') {
              module.bind.closeOnScroll();
            }

            if (module.is.closable()) {
              module.bind.clickaway();
            } else if (settings.on == 'hover' && openedWithTouch) {
              module.bind.touchClose();
            }
          },
          closeOnScroll: function closeOnScroll() {
            module.verbose('Binding scroll close event to document');
            $scrollContext.one(module.get.scrollEvent() + elementNamespace, module.event.hideGracefully);
          },
          touchClose: function touchClose() {
            module.verbose('Binding popup touchclose event to document');
            $document.on('touchstart' + elementNamespace, function (event) {
              module.verbose('Touched away from popup');
              module.event.hideGracefully.call(element, event);
            });
          },
          clickaway: function clickaway() {
            module.verbose('Binding popup close event to document');
            $document.on('click' + elementNamespace, function (event) {
              module.verbose('Clicked away from popup');
              module.event.hideGracefully.call(element, event);
            });
          }
        },
        unbind: {
          events: function events() {
            $window.off(elementNamespace);
            $module.off(eventNamespace);
          },
          close: function close() {
            $document.off(elementNamespace);
            $scrollContext.off(elementNamespace);
          }
        },
        has: {
          popup: function popup() {
            return $popup && $popup.length > 0;
          }
        },
        should: {
          centerArrow: function centerArrow(calculations) {
            return !module.is.basic() && calculations.target.width <= settings.arrowPixelsFromEdge * 2;
          }
        },
        is: {
          closable: function closable() {
            if (settings.closable == 'auto') {
              if (settings.on == 'hover') {
                return false;
              }

              return true;
            }

            return settings.closable;
          },
          offstage: function offstage(distanceFromBoundary, position) {
            var offstage = []; // return boundaries that have been surpassed

            $.each(distanceFromBoundary, function (direction, distance) {
              if (distance < -settings.jitter) {
                module.debug('Position exceeds allowable distance from edge', direction, distance, position);
                offstage.push(direction);
              }
            });

            if (offstage.length > 0) {
              return true;
            } else {
              return false;
            }
          },
          svg: function svg(element) {
            return module.supports.svg() && element instanceof SVGGraphicsElement;
          },
          basic: function basic() {
            return $module.hasClass(className.basic);
          },
          active: function active() {
            return $module.hasClass(className.active);
          },
          animating: function animating() {
            return $popup !== undefined && $popup.hasClass(className.animating);
          },
          fluid: function fluid() {
            return $popup !== undefined && $popup.hasClass(className.fluid);
          },
          visible: function visible() {
            return $popup !== undefined && $popup.hasClass(className.popupVisible);
          },
          dropdown: function dropdown() {
            return $module.hasClass(className.dropdown);
          },
          hidden: function hidden() {
            return !module.is.visible();
          },
          rtl: function rtl() {
            return $module.css('direction') == 'rtl';
          }
        },
        reset: function reset() {
          module.remove.visible();

          if (settings.preserve) {
            if ($.fn.transition !== undefined) {
              $popup.transition('remove transition');
            }
          } else {
            module.removePopup();
          }
        },
        setting: function setting(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            settings[name] = value;
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.popup.settings = {
    name: 'Popup',
    // module settings
    silent: false,
    debug: false,
    verbose: false,
    performance: true,
    namespace: 'popup',
    // whether it should use dom mutation observers
    observeChanges: true,
    // callback only when element added to dom
    onCreate: function onCreate() {},
    // callback before element removed from dom
    onRemove: function onRemove() {},
    // callback before show animation
    onShow: function onShow() {},
    // callback after show animation
    onVisible: function onVisible() {},
    // callback before hide animation
    onHide: function onHide() {},
    // callback when popup cannot be positioned in visible screen
    onUnplaceable: function onUnplaceable() {},
    // callback after hide animation
    onHidden: function onHidden() {},
    // when to show popup
    on: 'hover',
    // element to use to determine if popup is out of boundary
    boundary: window,
    // whether to add touchstart events when using hover
    addTouchEvents: true,
    // default position relative to element
    position: 'top left',
    // name of variation to use
    variation: '',
    // whether popup should be moved to context
    movePopup: true,
    // element which popup should be relative to
    target: false,
    // jq selector or element that should be used as popup
    popup: false,
    // popup should remain inline next to activator
    inline: false,
    // popup should be removed from page on hide
    preserve: false,
    // popup should not close when being hovered on
    hoverable: false,
    // explicitly set content
    content: false,
    // explicitly set html
    html: false,
    // explicitly set title
    title: false,
    // whether automatically close on clickaway when on click
    closable: true,
    // automatically hide on scroll
    hideOnScroll: 'auto',
    // hide other popups on show
    exclusive: false,
    // context to attach popups
    context: 'body',
    // context for binding scroll events
    scrollContext: window,
    // position to prefer when calculating new position
    prefer: 'opposite',
    // specify position to appear even if it doesn't fit
    lastResort: false,
    // number of pixels from edge of popup to pointing arrow center (used from centering)
    arrowPixelsFromEdge: 20,
    // delay used to prevent accidental refiring of animations due to user error
    delay: {
      show: 50,
      hide: 70
    },
    // whether fluid variation should assign width explicitly
    setFluidWidth: true,
    // transition settings
    duration: 200,
    transition: 'scale',
    // distance away from activating element in px
    distanceAway: 0,
    // number of pixels an element is allowed to be "offstage" for a position to be chosen (allows for rounding)
    jitter: 2,
    // offset on aligning axis from calculated position
    offset: 0,
    // maximum times to look for a position before failing (9 positions total)
    maxSearchDepth: 15,
    error: {
      invalidPosition: 'The position you specified is not a valid position',
      cannotPlace: 'Popup does not fit within the boundaries of the viewport',
      method: 'The method you called is not defined.',
      noTransition: 'This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>',
      notFound: 'The target or popup you specified does not exist on the page'
    },
    metadata: {
      activator: 'activator',
      content: 'content',
      html: 'html',
      offset: 'offset',
      position: 'position',
      title: 'title',
      variation: 'variation'
    },
    className: {
      active: 'active',
      basic: 'basic',
      animating: 'animating',
      dropdown: 'dropdown',
      fluid: 'fluid',
      loading: 'loading',
      popup: 'ui popup',
      position: 'top left center bottom right',
      visible: 'visible',
      popupVisible: 'visible'
    },
    selector: {
      popup: '.ui.popup'
    },
    templates: {
      escape: function escape(string) {
        var badChars = /[&<>"'`]/g,
            shouldEscape = /[&<>"'`]/,
            escape = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "`": "&#x60;"
        },
            escapedChar = function escapedChar(chr) {
          return escape[chr];
        };

        if (shouldEscape.test(string)) {
          return string.replace(badChars, escapedChar);
        }

        return string;
      },
      popup: function popup(text) {
        var html = '',
            escape = $.fn.popup.settings.templates.escape;

        if (_typeof(text) !== undefined) {
          if (_typeof(text.title) !== undefined && text.title) {
            text.title = escape(text.title);
            html += '<div class="header">' + text.title + '</div>';
          }

          if (_typeof(text.content) !== undefined && text.content) {
            text.content = escape(text.content);
            html += '<div class="content">' + text.content + '</div>';
          }
        }

        return html;
      }
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Progress
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  var global = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.progress = function (parameters) {
    var $allModules = $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;
    $allModules.each(function () {
      var _settings3 = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.progress.settings, parameters) : $.extend({}, $.fn.progress.settings),
          className = _settings3.className,
          _metadata = _settings3.metadata,
          namespace = _settings3.namespace,
          selector = _settings3.selector,
          error = _settings3.error,
          eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          $module = $(this),
          $bar = $(this).find(selector.bar),
          $progress = $(this).find(selector.progress),
          $label = $(this).find(selector.label),
          element = this,
          instance = $module.data(moduleNamespace),
          animating = false,
          transitionEnd,
          module;

      module = {
        initialize: function initialize() {
          module.debug('Initializing progress bar', _settings3);
          module.set.duration();
          module.set.transitionEvent();
          module.read.metadata();
          module.read.settings();
          module.instantiate();
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance of progress', module);
          instance = module;
          $module.data(moduleNamespace, module);
        },
        destroy: function destroy() {
          module.verbose('Destroying previous progress for', $module);
          clearInterval(instance.interval);
          module.remove.state();
          $module.removeData(moduleNamespace);
          instance = undefined;
        },
        reset: function reset() {
          module.remove.nextValue();
          module.update.progress(0);
        },
        complete: function complete() {
          if (module.percent === undefined || module.percent < 100) {
            module.remove.progressPoll();
            module.set.percent(100);
          }
        },
        read: {
          metadata: function metadata() {
            var data = {
              percent: $module.data(_metadata.percent),
              total: $module.data(_metadata.total),
              value: $module.data(_metadata.value)
            };

            if (data.percent) {
              module.debug('Current percent value set from metadata', data.percent);
              module.set.percent(data.percent);
            }

            if (data.total) {
              module.debug('Total value set from metadata', data.total);
              module.set.total(data.total);
            }

            if (data.value) {
              module.debug('Current value set from metadata', data.value);
              module.set.value(data.value);
              module.set.progress(data.value);
            }
          },
          settings: function settings() {
            if (_settings3.total !== false) {
              module.debug('Current total set in settings', _settings3.total);
              module.set.total(_settings3.total);
            }

            if (_settings3.value !== false) {
              module.debug('Current value set in settings', _settings3.value);
              module.set.value(_settings3.value);
              module.set.progress(module.value);
            }

            if (_settings3.percent !== false) {
              module.debug('Current percent set in settings', _settings3.percent);
              module.set.percent(_settings3.percent);
            }
          }
        },
        bind: {
          transitionEnd: function transitionEnd(callback) {
            var transitionEnd = module.get.transitionEnd();
            $bar.one(transitionEnd + eventNamespace, function (event) {
              clearTimeout(module.failSafeTimer);
              callback.call(this, event);
            });
            module.failSafeTimer = setTimeout(function () {
              $bar.triggerHandler(transitionEnd);
            }, _settings3.duration + _settings3.failSafeDelay);
            module.verbose('Adding fail safe timer', module.timer);
          }
        },
        increment: function increment(incrementValue) {
          var maxValue, startValue, newValue;

          if (module.has.total()) {
            startValue = module.get.value();
            incrementValue = incrementValue || 1;
            newValue = startValue + incrementValue;
          } else {
            startValue = module.get.percent();
            incrementValue = incrementValue || module.get.randomValue();
            newValue = startValue + incrementValue;
            maxValue = 100;
            module.debug('Incrementing percentage by', startValue, newValue);
          }

          newValue = module.get.normalizedValue(newValue);
          module.set.progress(newValue);
        },
        decrement: function decrement(decrementValue) {
          var total = module.get.total(),
              startValue,
              newValue;

          if (total) {
            startValue = module.get.value();
            decrementValue = decrementValue || 1;
            newValue = startValue - decrementValue;
            module.debug('Decrementing value by', decrementValue, startValue);
          } else {
            startValue = module.get.percent();
            decrementValue = decrementValue || module.get.randomValue();
            newValue = startValue - decrementValue;
            module.debug('Decrementing percentage by', decrementValue, startValue);
          }

          newValue = module.get.normalizedValue(newValue);
          module.set.progress(newValue);
        },
        has: {
          progressPoll: function progressPoll() {
            return module.progressPoll;
          },
          total: function total() {
            return module.get.total() !== false;
          }
        },
        get: {
          text: function text(templateText) {
            var value = module.value || 0,
                total = module.total || 0,
                percent = animating ? module.get.displayPercent() : module.percent || 0,
                left = module.total > 0 ? total - value : 100 - percent;
            templateText = templateText || '';
            templateText = templateText.replace('{value}', value).replace('{total}', total).replace('{left}', left).replace('{percent}', percent);
            module.verbose('Adding variables to progress bar text', templateText);
            return templateText;
          },
          normalizedValue: function normalizedValue(value) {
            if (value < 0) {
              module.debug('Value cannot decrement below 0');
              return 0;
            }

            if (module.has.total()) {
              if (value > module.total) {
                module.debug('Value cannot increment above total', module.total);
                return module.total;
              }
            } else if (value > 100) {
              module.debug('Value cannot increment above 100 percent');
              return 100;
            }

            return value;
          },
          updateInterval: function updateInterval() {
            if (_settings3.updateInterval == 'auto') {
              return _settings3.duration;
            }

            return _settings3.updateInterval;
          },
          randomValue: function randomValue() {
            module.debug('Generating random increment percentage');
            return Math.floor(Math.random() * _settings3.random.max + _settings3.random.min);
          },
          numericValue: function numericValue(value) {
            return typeof value === 'string' ? value.replace(/[^\d.]/g, '') !== '' ? +value.replace(/[^\d.]/g, '') : false : value;
          },
          transitionEnd: function transitionEnd() {
            var element = document.createElement('element'),
                transitions = {
              'transition': 'transitionend',
              'OTransition': 'oTransitionEnd',
              'MozTransition': 'transitionend',
              'WebkitTransition': 'webkitTransitionEnd'
            },
                transition;

            for (transition in transitions) {
              if (element.style[transition] !== undefined) {
                return transitions[transition];
              }
            }
          },
          // gets current displayed percentage (if animating values this is the intermediary value)
          displayPercent: function displayPercent() {
            var barWidth = $bar.width(),
                totalWidth = $module.width(),
                minDisplay = parseInt($bar.css('min-width'), 10),
                displayPercent = barWidth > minDisplay ? barWidth / totalWidth * 100 : module.percent;
            return _settings3.precision > 0 ? Math.round(displayPercent * (10 * _settings3.precision)) / (10 * _settings3.precision) : Math.round(displayPercent);
          },
          percent: function percent() {
            return module.percent || 0;
          },
          value: function value() {
            return module.nextValue || module.value || 0;
          },
          total: function total() {
            return module.total || false;
          }
        },
        create: {
          progressPoll: function progressPoll() {
            module.progressPoll = setTimeout(function () {
              module.update.toNextValue();
              module.remove.progressPoll();
            }, module.get.updateInterval());
          }
        },
        is: {
          complete: function complete() {
            return module.is.success() || module.is.warning() || module.is.error();
          },
          success: function success() {
            return $module.hasClass(className.success);
          },
          warning: function warning() {
            return $module.hasClass(className.warning);
          },
          error: function error() {
            return $module.hasClass(className.error);
          },
          active: function active() {
            return $module.hasClass(className.active);
          },
          visible: function visible() {
            return $module.is(':visible');
          }
        },
        remove: {
          progressPoll: function progressPoll() {
            module.verbose('Removing progress poll timer');

            if (module.progressPoll) {
              clearTimeout(module.progressPoll);
              delete module.progressPoll;
            }
          },
          nextValue: function nextValue() {
            module.verbose('Removing progress value stored for next update');
            delete module.nextValue;
          },
          state: function state() {
            module.verbose('Removing stored state');
            delete module.total;
            delete module.percent;
            delete module.value;
          },
          active: function active() {
            module.verbose('Removing active state');
            $module.removeClass(className.active);
          },
          success: function success() {
            module.verbose('Removing success state');
            $module.removeClass(className.success);
          },
          warning: function warning() {
            module.verbose('Removing warning state');
            $module.removeClass(className.warning);
          },
          error: function error() {
            module.verbose('Removing error state');
            $module.removeClass(className.error);
          }
        },
        set: {
          barWidth: function barWidth(value) {
            if (value > 100) {
              module.error(error.tooHigh, value);
            } else if (value < 0) {
              module.error(error.tooLow, value);
            } else {
              $bar.css('width', value + '%');
              $module.attr('data-percent', parseInt(value, 10));
            }
          },
          duration: function duration(_duration) {
            _duration = _duration || _settings3.duration;
            _duration = typeof _duration == 'number' ? _duration + 'ms' : _duration;
            module.verbose('Setting progress bar transition duration', _duration);
            $bar.css({
              'transition-duration': _duration
            });
          },
          percent: function percent(_percent) {
            _percent = typeof _percent == 'string' ? +_percent.replace('%', '') : _percent; // round display percentage

            _percent = _settings3.precision > 0 ? Math.round(_percent * (10 * _settings3.precision)) / (10 * _settings3.precision) : Math.round(_percent);
            module.percent = _percent;

            if (!module.has.total()) {
              module.value = _settings3.precision > 0 ? Math.round(_percent / 100 * module.total * (10 * _settings3.precision)) / (10 * _settings3.precision) : Math.round(_percent / 100 * module.total * 10) / 10;

              if (_settings3.limitValues) {
                module.value = module.value > 100 ? 100 : module.value < 0 ? 0 : module.value;
              }
            }

            module.set.barWidth(_percent);
            module.set.labelInterval();
            module.set.labels();

            _settings3.onChange.call(element, _percent, module.value, module.total);
          },
          labelInterval: function labelInterval() {
            var animationCallback = function animationCallback() {
              module.verbose('Bar finished animating, removing continuous label updates');
              clearInterval(module.interval);
              animating = false;
              module.set.labels();
            };

            clearInterval(module.interval);
            module.bind.transitionEnd(animationCallback);
            animating = true;
            module.interval = setInterval(function () {
              var isInDOM = $.contains(document.documentElement, element);

              if (!isInDOM) {
                clearInterval(module.interval);
                animating = false;
              }

              module.set.labels();
            }, _settings3.framerate);
          },
          labels: function labels() {
            module.verbose('Setting both bar progress and outer label text');
            module.set.barLabel();
            module.set.state();
          },
          label: function label(text) {
            text = text || '';

            if (text) {
              text = module.get.text(text);
              module.verbose('Setting label to text', text);
              $label.text(text);
            }
          },
          state: function state(percent) {
            percent = percent !== undefined ? percent : module.percent;

            if (percent === 100) {
              if (_settings3.autoSuccess && !(module.is.warning() || module.is.error() || module.is.success())) {
                module.set.success();
                module.debug('Automatically triggering success at 100%');
              } else {
                module.verbose('Reached 100% removing active state');
                module.remove.active();
                module.remove.progressPoll();
              }
            } else if (percent > 0) {
              module.verbose('Adjusting active progress bar label', percent);
              module.set.active();
            } else {
              module.remove.active();
              module.set.label(_settings3.text.active);
            }
          },
          barLabel: function barLabel(text) {
            if (text !== undefined) {
              $progress.text(module.get.text(text));
            } else if (_settings3.label == 'ratio' && module.total) {
              module.verbose('Adding ratio to bar label');
              $progress.text(module.get.text(_settings3.text.ratio));
            } else if (_settings3.label == 'percent') {
              module.verbose('Adding percentage to bar label');
              $progress.text(module.get.text(_settings3.text.percent));
            }
          },
          active: function active(text) {
            text = text || _settings3.text.active;
            module.debug('Setting active state');

            if (_settings3.showActivity && !module.is.active()) {
              $module.addClass(className.active);
            }

            module.remove.warning();
            module.remove.error();
            module.remove.success();
            text = _settings3.onLabelUpdate('active', text, module.value, module.total);

            if (text) {
              module.set.label(text);
            }

            module.bind.transitionEnd(function () {
              _settings3.onActive.call(element, module.value, module.total);
            });
          },
          success: function success(text) {
            text = text || _settings3.text.success || _settings3.text.active;
            module.debug('Setting success state');
            $module.addClass(className.success);
            module.remove.active();
            module.remove.warning();
            module.remove.error();
            module.complete();

            if (_settings3.text.success) {
              text = _settings3.onLabelUpdate('success', text, module.value, module.total);
              module.set.label(text);
            } else {
              text = _settings3.onLabelUpdate('active', text, module.value, module.total);
              module.set.label(text);
            }

            module.bind.transitionEnd(function () {
              _settings3.onSuccess.call(element, module.total);
            });
          },
          warning: function warning(text) {
            text = text || _settings3.text.warning;
            module.debug('Setting warning state');
            $module.addClass(className.warning);
            module.remove.active();
            module.remove.success();
            module.remove.error();
            module.complete();
            text = _settings3.onLabelUpdate('warning', text, module.value, module.total);

            if (text) {
              module.set.label(text);
            }

            module.bind.transitionEnd(function () {
              _settings3.onWarning.call(element, module.value, module.total);
            });
          },
          error: function error(text) {
            text = text || _settings3.text.error;
            module.debug('Setting error state');
            $module.addClass(className.error);
            module.remove.active();
            module.remove.success();
            module.remove.warning();
            module.complete();
            text = _settings3.onLabelUpdate('error', text, module.value, module.total);

            if (text) {
              module.set.label(text);
            }

            module.bind.transitionEnd(function () {
              _settings3.onError.call(element, module.value, module.total);
            });
          },
          transitionEvent: function transitionEvent() {
            transitionEnd = module.get.transitionEnd();
          },
          total: function total(totalValue) {
            module.total = totalValue;
          },
          value: function value(_value5) {
            module.value = _value5;
          },
          progress: function progress(value) {
            if (!module.has.progressPoll()) {
              module.debug('First update in progress update interval, immediately updating', value);
              module.update.progress(value);
              module.create.progressPoll();
            } else {
              module.debug('Updated within interval, setting next update to use new value', value);
              module.set.nextValue(value);
            }
          },
          nextValue: function nextValue(value) {
            module.nextValue = value;
          }
        },
        update: {
          toNextValue: function toNextValue() {
            var nextValue = module.nextValue;

            if (nextValue) {
              module.debug('Update interval complete using last updated value', nextValue);
              module.update.progress(nextValue);
              module.remove.nextValue();
            }
          },
          progress: function progress(value) {
            var percentComplete;
            value = module.get.numericValue(value);

            if (value === false) {
              module.error(error.nonNumeric, value);
            }

            value = module.get.normalizedValue(value);

            if (module.has.total()) {
              module.set.value(value);
              percentComplete = value / module.total * 100;
              module.debug('Calculating percent complete from total', percentComplete);
              module.set.percent(percentComplete);
            } else {
              percentComplete = value;
              module.debug('Setting value to exact percentage value', percentComplete);
              module.set.percent(percentComplete);
            }
          }
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, _settings3, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(_settings3[name])) {
              $.extend(true, _settings3[name], value);
            } else {
              _settings3[name] = value;
            }
          } else {
            return _settings3[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!_settings3.silent && _settings3.debug) {
            if (_settings3.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, _settings3.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!_settings3.silent && _settings3.verbose && _settings3.debug) {
            if (_settings3.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, _settings3.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!_settings3.silent) {
            module.error = Function.prototype.bind.call(console.error, console, _settings3.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (_settings3.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = _settings3.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                module.error(error.method, query);
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.progress.settings = {
    name: 'Progress',
    namespace: 'progress',
    silent: false,
    debug: false,
    verbose: false,
    performance: true,
    random: {
      min: 2,
      max: 5
    },
    duration: 300,
    updateInterval: 'auto',
    autoSuccess: true,
    showActivity: true,
    limitValues: true,
    label: 'percent',
    precision: 0,
    framerate: 1000 / 30,
    /// 30 fps
    percent: false,
    total: false,
    value: false,
    // delay in ms for fail safe animation callback
    failSafeDelay: 100,
    onLabelUpdate: function onLabelUpdate(state, text, value, total) {
      return text;
    },
    onChange: function onChange(percent, value, total) {},
    onSuccess: function onSuccess(total) {},
    onActive: function onActive(value, total) {},
    onError: function onError(value, total) {},
    onWarning: function onWarning(value, total) {},
    error: {
      method: 'The method you called is not defined.',
      nonNumeric: 'Progress value is non numeric',
      tooHigh: 'Value specified is above 100%',
      tooLow: 'Value specified is below 0%'
    },
    regExp: {
      variable: /\{\$*[A-z0-9]+\}/g
    },
    metadata: {
      percent: 'percent',
      total: 'total',
      value: 'value'
    },
    selector: {
      bar: '> .bar',
      label: '> .label',
      progress: '.bar > .progress'
    },
    text: {
      active: false,
      error: false,
      success: false,
      warning: false,
      percent: '{percent}%',
      ratio: '{value} of {total}'
    },
    className: {
      active: 'active',
      error: 'error',
      success: 'success',
      warning: 'warning'
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Rating
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.rating = function (parameters) {
    var $allModules = $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;
    $allModules.each(function () {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.rating.settings, parameters) : $.extend({}, $.fn.rating.settings),
          namespace = settings.namespace,
          className = settings.className,
          metadata = settings.metadata,
          selector = settings.selector,
          error = settings.error,
          eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          element = this,
          instance = $(this).data(moduleNamespace),
          $module = $(this),
          $icon = $module.find(selector.icon),
          _initialLoad3,
          module;

      module = {
        initialize: function initialize() {
          module.verbose('Initializing rating module', settings);

          if ($icon.length === 0) {
            module.setup.layout();
          }

          if (settings.interactive) {
            module.enable();
          } else {
            module.disable();
          }

          module.set.initialLoad();
          module.set.rating(module.get.initialRating());
          module.remove.initialLoad();
          module.instantiate();
        },
        instantiate: function instantiate() {
          module.verbose('Instantiating module', settings);
          instance = module;
          $module.data(moduleNamespace, module);
        },
        destroy: function destroy() {
          module.verbose('Destroying previous instance', instance);
          module.remove.events();
          $module.removeData(moduleNamespace);
        },
        refresh: function refresh() {
          $icon = $module.find(selector.icon);
        },
        setup: {
          layout: function layout() {
            var maxRating = module.get.maxRating(),
                html = $.fn.rating.settings.templates.icon(maxRating);
            module.debug('Generating icon html dynamically');
            $module.html(html);
            module.refresh();
          }
        },
        event: {
          mouseenter: function mouseenter() {
            var $activeIcon = $(this);
            $activeIcon.nextAll().removeClass(className.selected);
            $module.addClass(className.selected);
            $activeIcon.addClass(className.selected).prevAll().addClass(className.selected);
          },
          mouseleave: function mouseleave() {
            $module.removeClass(className.selected);
            $icon.removeClass(className.selected);
          },
          click: function click() {
            var $activeIcon = $(this),
                currentRating = module.get.rating(),
                rating = $icon.index($activeIcon) + 1,
                canClear = settings.clearable == 'auto' ? $icon.length === 1 : settings.clearable;

            if (canClear && currentRating == rating) {
              module.clearRating();
            } else {
              module.set.rating(rating);
            }
          }
        },
        clearRating: function clearRating() {
          module.debug('Clearing current rating');
          module.set.rating(0);
        },
        bind: {
          events: function events() {
            module.verbose('Binding events');
            $module.on('mouseenter' + eventNamespace, selector.icon, module.event.mouseenter).on('mouseleave' + eventNamespace, selector.icon, module.event.mouseleave).on('click' + eventNamespace, selector.icon, module.event.click);
          }
        },
        remove: {
          events: function events() {
            module.verbose('Removing events');
            $module.off(eventNamespace);
          },
          initialLoad: function initialLoad() {
            _initialLoad3 = false;
          }
        },
        enable: function enable() {
          module.debug('Setting rating to interactive mode');
          module.bind.events();
          $module.removeClass(className.disabled);
        },
        disable: function disable() {
          module.debug('Setting rating to read-only mode');
          module.remove.events();
          $module.addClass(className.disabled);
        },
        is: {
          initialLoad: function initialLoad() {
            return _initialLoad3;
          }
        },
        get: {
          initialRating: function initialRating() {
            if ($module.data(metadata.rating) !== undefined) {
              $module.removeData(metadata.rating);
              return $module.data(metadata.rating);
            }

            return settings.initialRating;
          },
          maxRating: function maxRating() {
            if ($module.data(metadata.maxRating) !== undefined) {
              $module.removeData(metadata.maxRating);
              return $module.data(metadata.maxRating);
            }

            return settings.maxRating;
          },
          rating: function rating() {
            var currentRating = $icon.filter('.' + className.active).length;
            module.verbose('Current rating retrieved', currentRating);
            return currentRating;
          }
        },
        set: {
          rating: function rating(_rating) {
            var ratingIndex = _rating - 1 >= 0 ? _rating - 1 : 0,
                $activeIcon = $icon.eq(ratingIndex);
            $module.removeClass(className.selected);
            $icon.removeClass(className.selected).removeClass(className.active);

            if (_rating > 0) {
              module.verbose('Setting current rating to', _rating);
              $activeIcon.prevAll().addBack().addClass(className.active);
            }

            if (!module.is.initialLoad()) {
              settings.onRate.call(element, _rating);
            }
          },
          initialLoad: function initialLoad() {
            _initialLoad3 = true;
          }
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ($allModules.length > 1) {
              title += ' ' + '(' + $allModules.length + ')';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.rating.settings = {
    name: 'Rating',
    namespace: 'rating',
    slent: false,
    debug: false,
    verbose: false,
    performance: true,
    initialRating: 0,
    interactive: true,
    maxRating: 4,
    clearable: 'auto',
    fireOnInit: false,
    onRate: function onRate(rating) {},
    error: {
      method: 'The method you called is not defined',
      noMaximum: 'No maximum rating specified. Cannot generate HTML automatically'
    },
    metadata: {
      rating: 'rating',
      maxRating: 'maxRating'
    },
    className: {
      active: 'active',
      disabled: 'disabled',
      selected: 'selected',
      loading: 'loading'
    },
    selector: {
      icon: '.icon'
    },
    templates: {
      icon: function icon(maxRating) {
        var icon = 1,
            html = '';

        while (icon <= maxRating) {
          html += '<i class="icon"></i>';
          icon++;
        }

        return html;
      }
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Search
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.search = function (parameters) {
    var $allModules = $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;
    $(this).each(function () {
      var _settings4 = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.search.settings, parameters) : $.extend({}, $.fn.search.settings),
          className = _settings4.className,
          metadata = _settings4.metadata,
          regExp = _settings4.regExp,
          fields = _settings4.fields,
          selector = _settings4.selector,
          error = _settings4.error,
          namespace = _settings4.namespace,
          eventNamespace = '.' + namespace,
          moduleNamespace = namespace + '-module',
          $module = $(this),
          $prompt = $module.find(selector.prompt),
          $searchButton = $module.find(selector.searchButton),
          $results = $module.find(selector.results),
          $result = $module.find(selector.result),
          $category = $module.find(selector.category),
          element = this,
          instance = $module.data(moduleNamespace),
          disabledBubbled = false,
          resultsDismissed = false,
          module;

      module = {
        initialize: function initialize() {
          module.verbose('Initializing module');
          module.get.settings();
          module.determine.searchFields();
          module.bind.events();
          module.set.type();
          module.create.results();
          module.instantiate();
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module.data(moduleNamespace, module);
        },
        destroy: function destroy() {
          module.verbose('Destroying instance');
          $module.off(eventNamespace).removeData(moduleNamespace);
        },
        refresh: function refresh() {
          module.debug('Refreshing selector cache');
          $prompt = $module.find(selector.prompt);
          $searchButton = $module.find(selector.searchButton);
          $category = $module.find(selector.category);
          $results = $module.find(selector.results);
          $result = $module.find(selector.result);
        },
        refreshResults: function refreshResults() {
          $results = $module.find(selector.results);
          $result = $module.find(selector.result);
        },
        bind: {
          events: function events() {
            module.verbose('Binding events to search');

            if (_settings4.automatic) {
              $module.on(module.get.inputEvent() + eventNamespace, selector.prompt, module.event.input);
              $prompt.attr('autocomplete', 'off');
            }

            $module // prompt
            .on('focus' + eventNamespace, selector.prompt, module.event.focus).on('blur' + eventNamespace, selector.prompt, module.event.blur).on('keydown' + eventNamespace, selector.prompt, module.handleKeyboard) // search button
            .on('click' + eventNamespace, selector.searchButton, module.query) // results
            .on('mousedown' + eventNamespace, selector.results, module.event.result.mousedown).on('mouseup' + eventNamespace, selector.results, module.event.result.mouseup).on('click' + eventNamespace, selector.result, module.event.result.click);
          }
        },
        determine: {
          searchFields: function searchFields() {
            // this makes sure $.extend does not add specified search fields to default fields
            // this is the only setting which should not extend defaults
            if (parameters && parameters.searchFields !== undefined) {
              _settings4.searchFields = parameters.searchFields;
            }
          }
        },
        event: {
          input: function input() {
            if (_settings4.searchDelay) {
              clearTimeout(module.timer);
              module.timer = setTimeout(function () {
                if (module.is.focused()) {
                  module.query();
                }
              }, _settings4.searchDelay);
            } else {
              module.query();
            }
          },
          focus: function focus() {
            module.set.focus();

            if (_settings4.searchOnFocus && module.has.minimumCharacters()) {
              module.query(function () {
                if (module.can.show()) {
                  module.showResults();
                }
              });
            }
          },
          blur: function blur(event) {
            var pageLostFocus = document.activeElement === this,
                callback = function callback() {
              module.cancel.query();
              module.remove.focus();
              module.timer = setTimeout(module.hideResults, _settings4.hideDelay);
            };

            if (pageLostFocus) {
              return;
            }

            resultsDismissed = false;

            if (module.resultsClicked) {
              module.debug('Determining if user action caused search to close');
              $module.one('click.close' + eventNamespace, selector.results, function (event) {
                if (module.is.inMessage(event) || disabledBubbled) {
                  $prompt.focus();
                  return;
                }

                disabledBubbled = false;

                if (!module.is.animating() && !module.is.hidden()) {
                  callback();
                }
              });
            } else {
              module.debug('Input blurred without user action, closing results');
              callback();
            }
          },
          result: {
            mousedown: function mousedown() {
              module.resultsClicked = true;
            },
            mouseup: function mouseup() {
              module.resultsClicked = false;
            },
            click: function click(event) {
              module.debug('Search result selected');
              var $result = $(this),
                  $title = $result.find(selector.title).eq(0),
                  $link = $result.is('a[href]') ? $result : $result.find('a[href]').eq(0),
                  href = $link.attr('href') || false,
                  target = $link.attr('target') || false,
                  title = $title.html(),
                  // title is used for result lookup
              value = $title.length > 0 ? $title.text() : false,
                  results = module.get.results(),
                  result = $result.data(metadata.result) || module.get.result(value, results),
                  returnedValue;

              if ($.isFunction(_settings4.onSelect)) {
                if (_settings4.onSelect.call(element, result, results) === false) {
                  module.debug('Custom onSelect callback cancelled default select action');
                  disabledBubbled = true;
                  return;
                }
              }

              module.hideResults();

              if (value) {
                module.set.value(value);
              }

              if (href) {
                module.verbose('Opening search link found in result', $link);

                if (target == '_blank' || event.ctrlKey) {
                  window.open(href);
                } else {
                  window.location.href = href;
                }
              }
            }
          }
        },
        handleKeyboard: function handleKeyboard(event) {
          var // force selector refresh
          $result = $module.find(selector.result),
              $category = $module.find(selector.category),
              $activeResult = $result.filter('.' + className.active),
              currentIndex = $result.index($activeResult),
              resultSize = $result.length,
              hasActiveResult = $activeResult.length > 0,
              keyCode = event.which,
              keys = {
            backspace: 8,
            enter: 13,
            escape: 27,
            upArrow: 38,
            downArrow: 40
          },
              newIndex; // search shortcuts

          if (keyCode == keys.escape) {
            module.verbose('Escape key pressed, blurring search field');
            module.hideResults();
            resultsDismissed = true;
          }

          if (module.is.visible()) {
            if (keyCode == keys.enter) {
              module.verbose('Enter key pressed, selecting active result');

              if ($result.filter('.' + className.active).length > 0) {
                module.event.result.click.call($result.filter('.' + className.active), event);
                event.preventDefault();
                return false;
              }
            } else if (keyCode == keys.upArrow && hasActiveResult) {
              module.verbose('Up key pressed, changing active result');
              newIndex = currentIndex - 1 < 0 ? currentIndex : currentIndex - 1;
              $category.removeClass(className.active);
              $result.removeClass(className.active).eq(newIndex).addClass(className.active).closest($category).addClass(className.active);
              event.preventDefault();
            } else if (keyCode == keys.downArrow) {
              module.verbose('Down key pressed, changing active result');
              newIndex = currentIndex + 1 >= resultSize ? currentIndex : currentIndex + 1;
              $category.removeClass(className.active);
              $result.removeClass(className.active).eq(newIndex).addClass(className.active).closest($category).addClass(className.active);
              event.preventDefault();
            }
          } else {
            // query shortcuts
            if (keyCode == keys.enter) {
              module.verbose('Enter key pressed, executing query');
              module.query();
              module.set.buttonPressed();
              $prompt.one('keyup', module.remove.buttonFocus);
            }
          }
        },
        setup: {
          api: function api(searchTerm, callback) {
            var apiSettings = {
              debug: _settings4.debug,
              on: false,
              cache: _settings4.cache,
              action: 'search',
              urlData: {
                query: searchTerm
              },
              onSuccess: function onSuccess(response) {
                module.parse.response.call(element, response, searchTerm);
                callback();
              },
              onFailure: function onFailure() {
                module.displayMessage(error.serverError);
                callback();
              },
              onAbort: function onAbort(response) {},
              onError: module.error
            },
                searchHTML;
            $.extend(true, apiSettings, _settings4.apiSettings);
            module.verbose('Setting up API request', apiSettings);
            $module.api(apiSettings);
          }
        },
        can: {
          useAPI: function useAPI() {
            return $.fn.api !== undefined;
          },
          show: function show() {
            return module.is.focused() && !module.is.visible() && !module.is.empty();
          },
          transition: function transition() {
            return _settings4.transition && $.fn.transition !== undefined && $module.transition('is supported');
          }
        },
        is: {
          animating: function animating() {
            return $results.hasClass(className.animating);
          },
          hidden: function hidden() {
            return $results.hasClass(className.hidden);
          },
          inMessage: function inMessage(event) {
            if (!event.target) {
              return;
            }

            var $target = $(event.target),
                isInDOM = $.contains(document.documentElement, event.target);
            return isInDOM && $target.closest(selector.message).length > 0;
          },
          empty: function empty() {
            return $results.html() === '';
          },
          visible: function visible() {
            return $results.filter(':visible').length > 0;
          },
          focused: function focused() {
            return $prompt.filter(':focus').length > 0;
          }
        },
        get: {
          settings: function settings() {
            if ($.isPlainObject(parameters) && parameters.searchFullText) {
              _settings4.fullTextSearch = parameters.searchFullText;
              module.error(_settings4.error.oldSearchSyntax, element);
            }
          },
          inputEvent: function inputEvent() {
            var prompt = $prompt[0],
                inputEvent = prompt !== undefined && prompt.oninput !== undefined ? 'input' : prompt !== undefined && prompt.onpropertychange !== undefined ? 'propertychange' : 'keyup';
            return inputEvent;
          },
          value: function value() {
            return $prompt.val();
          },
          results: function results() {
            var results = $module.data(metadata.results);
            return results;
          },
          result: function result(value, results) {
            var lookupFields = ['title', 'id'],
                result = false;
            value = value !== undefined ? value : module.get.value();
            results = results !== undefined ? results : module.get.results();

            if (_settings4.type === 'category') {
              module.debug('Finding result that matches', value);
              $.each(results, function (index, category) {
                if ($.isArray(category.results)) {
                  result = module.search.object(value, category.results, lookupFields)[0]; // don't continue searching if a result is found

                  if (result) {
                    return false;
                  }
                }
              });
            } else {
              module.debug('Finding result in results object', value);
              result = module.search.object(value, results, lookupFields)[0];
            }

            return result || false;
          }
        },
        select: {
          firstResult: function firstResult() {
            module.verbose('Selecting first result');
            $result.first().addClass(className.active);
          }
        },
        set: {
          focus: function focus() {
            $module.addClass(className.focus);
          },
          loading: function loading() {
            $module.addClass(className.loading);
          },
          value: function value(_value6) {
            module.verbose('Setting search input value', _value6);
            $prompt.val(_value6);
          },
          type: function type(_type) {
            _type = _type || _settings4.type;

            if (_settings4.type == 'category') {
              $module.addClass(_settings4.type);
            }
          },
          buttonPressed: function buttonPressed() {
            $searchButton.addClass(className.pressed);
          }
        },
        remove: {
          loading: function loading() {
            $module.removeClass(className.loading);
          },
          focus: function focus() {
            $module.removeClass(className.focus);
          },
          buttonPressed: function buttonPressed() {
            $searchButton.removeClass(className.pressed);
          }
        },
        query: function query(callback) {
          callback = $.isFunction(callback) ? callback : function () {};
          var searchTerm = module.get.value(),
              cache = module.read.cache(searchTerm);

          callback = callback || function () {};

          if (module.has.minimumCharacters()) {
            if (cache) {
              module.debug('Reading result from cache', searchTerm);
              module.save.results(cache.results);
              module.addResults(cache.html);
              module.inject.id(cache.results);
              callback();
            } else {
              module.debug('Querying for', searchTerm);

              if ($.isPlainObject(_settings4.source) || $.isArray(_settings4.source)) {
                module.search.local(searchTerm);
                callback();
              } else if (module.can.useAPI()) {
                module.search.remote(searchTerm, callback);
              } else {
                module.error(error.source);
                callback();
              }
            }

            _settings4.onSearchQuery.call(element, searchTerm);
          } else {
            module.hideResults();
          }
        },
        search: {
          local: function local(searchTerm) {
            var results = module.search.object(searchTerm, _settings4.content),
                searchHTML;
            module.set.loading();
            module.save.results(results);
            module.debug('Returned full local search results', results);

            if (_settings4.maxResults > 0) {
              module.debug('Using specified max results', results);
              results = results.slice(0, _settings4.maxResults);
            }

            if (_settings4.type == 'category') {
              results = module.create.categoryResults(results);
            }

            searchHTML = module.generateResults({
              results: results
            });
            module.remove.loading();
            module.addResults(searchHTML);
            module.inject.id(results);
            module.write.cache(searchTerm, {
              html: searchHTML,
              results: results
            });
          },
          remote: function remote(searchTerm, callback) {
            callback = $.isFunction(callback) ? callback : function () {};

            if ($module.api('is loading')) {
              $module.api('abort');
            }

            module.setup.api(searchTerm, callback);
            $module.api('query');
          },
          object: function object(searchTerm, source, searchFields) {
            var results = [],
                exactResults = [],
                fuzzyResults = [],
                searchExp = searchTerm.toString().replace(regExp.escape, '\\$&'),
                matchRegExp = new RegExp(regExp.beginsWith + searchExp, 'i'),
                // avoid duplicates when pushing results
            addResult = function addResult(array, result) {
              var notResult = $.inArray(result, results) == -1,
                  notFuzzyResult = $.inArray(result, fuzzyResults) == -1,
                  notExactResults = $.inArray(result, exactResults) == -1;

              if (notResult && notFuzzyResult && notExactResults) {
                array.push(result);
              }
            };

            source = source || _settings4.source;
            searchFields = searchFields !== undefined ? searchFields : _settings4.searchFields; // search fields should be array to loop correctly

            if (!$.isArray(searchFields)) {
              searchFields = [searchFields];
            } // exit conditions if no source


            if (source === undefined || source === false) {
              module.error(error.source);
              return [];
            } // iterate through search fields looking for matches


            $.each(searchFields, function (index, field) {
              $.each(source, function (label, content) {
                var fieldExists = typeof content[field] == 'string';

                if (fieldExists) {
                  if (content[field].search(matchRegExp) !== -1) {
                    // content starts with value (first in results)
                    addResult(results, content);
                  } else if (_settings4.fullTextSearch === 'exact' && module.exactSearch(searchTerm, content[field])) {
                    // content fuzzy matches (last in results)
                    addResult(exactResults, content);
                  } else if (_settings4.fullTextSearch == true && module.fuzzySearch(searchTerm, content[field])) {
                    // content fuzzy matches (last in results)
                    addResult(fuzzyResults, content);
                  }
                }
              });
            });
            $.merge(exactResults, fuzzyResults);
            $.merge(results, exactResults);
            return results;
          }
        },
        exactSearch: function exactSearch(query, term) {
          query = query.toLowerCase();
          term = term.toLowerCase();

          if (term.indexOf(query) > -1) {
            return true;
          }

          return false;
        },
        fuzzySearch: function fuzzySearch(query, term) {
          var termLength = term.length,
              queryLength = query.length;

          if (typeof query !== 'string') {
            return false;
          }

          query = query.toLowerCase();
          term = term.toLowerCase();

          if (queryLength > termLength) {
            return false;
          }

          if (queryLength === termLength) {
            return query === term;
          }

          search: for (var characterIndex = 0, nextCharacterIndex = 0; characterIndex < queryLength; characterIndex++) {
            var queryCharacter = query.charCodeAt(characterIndex);

            while (nextCharacterIndex < termLength) {
              if (term.charCodeAt(nextCharacterIndex++) === queryCharacter) {
                continue search;
              }
            }

            return false;
          }

          return true;
        },
        parse: {
          response: function response(_response, searchTerm) {
            var searchHTML = module.generateResults(_response);
            module.verbose('Parsing server response', _response);

            if (_response !== undefined) {
              if (searchTerm !== undefined && _response[fields.results] !== undefined) {
                module.addResults(searchHTML);
                module.inject.id(_response[fields.results]);
                module.write.cache(searchTerm, {
                  html: searchHTML,
                  results: _response[fields.results]
                });
                module.save.results(_response[fields.results]);
              }
            }
          }
        },
        cancel: {
          query: function query() {
            if (module.can.useAPI()) {
              $module.api('abort');
            }
          }
        },
        has: {
          minimumCharacters: function minimumCharacters() {
            var searchTerm = module.get.value(),
                numCharacters = searchTerm.length;
            return numCharacters >= _settings4.minCharacters;
          },
          results: function results() {
            if ($results.length === 0) {
              return false;
            }

            var html = $results.html();
            return html != '';
          }
        },
        clear: {
          cache: function cache(value) {
            var cache = $module.data(metadata.cache);

            if (!value) {
              module.debug('Clearing cache', value);
              $module.removeData(metadata.cache);
            } else if (value && cache && cache[value]) {
              module.debug('Removing value from cache', value);
              delete cache[value];
              $module.data(metadata.cache, cache);
            }
          }
        },
        read: {
          cache: function cache(name) {
            var cache = $module.data(metadata.cache);

            if (_settings4.cache) {
              module.verbose('Checking cache for generated html for query', name);
              return _typeof(cache) == 'object' && cache[name] !== undefined ? cache[name] : false;
            }

            return false;
          }
        },
        create: {
          categoryResults: function categoryResults(results) {
            var categoryResults = {};
            $.each(results, function (index, result) {
              if (!result.category) {
                return;
              }

              if (categoryResults[result.category] === undefined) {
                module.verbose('Creating new category of results', result.category);
                categoryResults[result.category] = {
                  name: result.category,
                  results: [result]
                };
              } else {
                categoryResults[result.category].results.push(result);
              }
            });
            return categoryResults;
          },
          id: function id(resultIndex, categoryIndex) {
            var resultID = resultIndex + 1,
                // not zero indexed
            categoryID = categoryIndex + 1,
                firstCharCode,
                letterID,
                id;

            if (categoryIndex !== undefined) {
              // start char code for "A"
              letterID = String.fromCharCode(97 + categoryIndex);
              id = letterID + resultID;
              module.verbose('Creating category result id', id);
            } else {
              id = resultID;
              module.verbose('Creating result id', id);
            }

            return id;
          },
          results: function results() {
            if ($results.length === 0) {
              $results = $('<div />').addClass(className.results).appendTo($module);
            }
          }
        },
        inject: {
          result: function result(_result, resultIndex, categoryIndex) {
            module.verbose('Injecting result into results');
            var $selectedResult = categoryIndex !== undefined ? $results.children().eq(categoryIndex).children(selector.results).first().children(selector.result).eq(resultIndex) : $results.children(selector.result).eq(resultIndex);
            module.verbose('Injecting results metadata', $selectedResult);
            $selectedResult.data(metadata.result, _result);
          },
          id: function id(results) {
            module.debug('Injecting unique ids into results');
            var // since results may be object, we must use counters
            categoryIndex = 0,
                resultIndex = 0;

            if (_settings4.type === 'category') {
              // iterate through each category result
              $.each(results, function (index, category) {
                resultIndex = 0;
                $.each(category.results, function (index, value) {
                  var result = category.results[index];

                  if (result.id === undefined) {
                    result.id = module.create.id(resultIndex, categoryIndex);
                  }

                  module.inject.result(result, resultIndex, categoryIndex);
                  resultIndex++;
                });
                categoryIndex++;
              });
            } else {
              // top level
              $.each(results, function (index, value) {
                var result = results[index];

                if (result.id === undefined) {
                  result.id = module.create.id(resultIndex);
                }

                module.inject.result(result, resultIndex);
                resultIndex++;
              });
            }

            return results;
          }
        },
        save: {
          results: function results(_results) {
            module.verbose('Saving current search results to metadata', _results);
            $module.data(metadata.results, _results);
          }
        },
        write: {
          cache: function cache(name, value) {
            var cache = $module.data(metadata.cache) !== undefined ? $module.data(metadata.cache) : {};

            if (_settings4.cache) {
              module.verbose('Writing generated html to cache', name, value);
              cache[name] = value;
              $module.data(metadata.cache, cache);
            }
          }
        },
        addResults: function addResults(html) {
          if ($.isFunction(_settings4.onResultsAdd)) {
            if (_settings4.onResultsAdd.call($results, html) === false) {
              module.debug('onResultsAdd callback cancelled default action');
              return false;
            }
          }

          if (html) {
            $results.html(html);
            module.refreshResults();

            if (_settings4.selectFirstResult) {
              module.select.firstResult();
            }

            module.showResults();
          } else {
            module.hideResults(function () {
              $results.empty();
            });
          }
        },
        showResults: function showResults(callback) {
          callback = $.isFunction(callback) ? callback : function () {};

          if (resultsDismissed) {
            return;
          }

          if (!module.is.visible() && module.has.results()) {
            if (module.can.transition()) {
              module.debug('Showing results with css animations');
              $results.transition({
                animation: _settings4.transition + ' in',
                debug: _settings4.debug,
                verbose: _settings4.verbose,
                duration: _settings4.duration,
                onComplete: function onComplete() {
                  callback();
                },
                queue: true
              });
            } else {
              module.debug('Showing results with javascript');
              $results.stop().fadeIn(_settings4.duration, _settings4.easing);
            }

            _settings4.onResultsOpen.call($results);
          }
        },
        hideResults: function hideResults(callback) {
          callback = $.isFunction(callback) ? callback : function () {};

          if (module.is.visible()) {
            if (module.can.transition()) {
              module.debug('Hiding results with css animations');
              $results.transition({
                animation: _settings4.transition + ' out',
                debug: _settings4.debug,
                verbose: _settings4.verbose,
                duration: _settings4.duration,
                onComplete: function onComplete() {
                  callback();
                },
                queue: true
              });
            } else {
              module.debug('Hiding results with javascript');
              $results.stop().fadeOut(_settings4.duration, _settings4.easing);
            }

            _settings4.onResultsClose.call($results);
          }
        },
        generateResults: function generateResults(response) {
          module.debug('Generating html from response', response);
          var template = _settings4.templates[_settings4.type],
              isProperObject = $.isPlainObject(response[fields.results]) && !$.isEmptyObject(response[fields.results]),
              isProperArray = $.isArray(response[fields.results]) && response[fields.results].length > 0,
              html = '';

          if (isProperObject || isProperArray) {
            if (_settings4.maxResults > 0) {
              if (isProperObject) {
                if (_settings4.type == 'standard') {
                  module.error(error.maxResults);
                }
              } else {
                response[fields.results] = response[fields.results].slice(0, _settings4.maxResults);
              }
            }

            if ($.isFunction(template)) {
              html = template(response, fields);
            } else {
              module.error(error.noTemplate, false);
            }
          } else if (_settings4.showNoResults) {
            html = module.displayMessage(error.noResults, 'empty');
          }

          _settings4.onResults.call(element, response);

          return html;
        },
        displayMessage: function displayMessage(text, type) {
          type = type || 'standard';
          module.debug('Displaying message', text, type);
          module.addResults(_settings4.templates.message(text, type));
          return _settings4.templates.message(text, type);
        },
        setting: function setting(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, _settings4, name);
          } else if (value !== undefined) {
            _settings4[name] = value;
          } else {
            return _settings4[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!_settings4.silent && _settings4.debug) {
            if (_settings4.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, _settings4.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!_settings4.silent && _settings4.verbose && _settings4.debug) {
            if (_settings4.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, _settings4.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!_settings4.silent) {
            module.error = Function.prototype.bind.call(console.error, console, _settings4.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (_settings4.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = _settings4.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ($allModules.length > 1) {
              title += ' ' + '(' + $allModules.length + ')';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.search.settings = {
    name: 'Search',
    namespace: 'search',
    silent: false,
    debug: false,
    verbose: false,
    performance: true,
    // template to use (specified in settings.templates)
    type: 'standard',
    // minimum characters required to search
    minCharacters: 1,
    // whether to select first result after searching automatically
    selectFirstResult: false,
    // API config
    apiSettings: false,
    // object to search
    source: false,
    // Whether search should query current term on focus
    searchOnFocus: true,
    // fields to search
    searchFields: ['title', 'description'],
    // field to display in standard results template
    displayField: '',
    // search anywhere in value (set to 'exact' to require exact matches
    fullTextSearch: 'exact',
    // whether to add events to prompt automatically
    automatic: true,
    // delay before hiding menu after blur
    hideDelay: 0,
    // delay before searching
    searchDelay: 200,
    // maximum results returned from search
    maxResults: 7,
    // whether to store lookups in local cache
    cache: true,
    // whether no results errors should be shown
    showNoResults: true,
    // transition settings
    transition: 'scale',
    duration: 200,
    easing: 'easeOutExpo',
    // callbacks
    onSelect: false,
    onResultsAdd: false,
    onSearchQuery: function onSearchQuery(query) {},
    onResults: function onResults(response) {},
    onResultsOpen: function onResultsOpen() {},
    onResultsClose: function onResultsClose() {},
    className: {
      animating: 'animating',
      active: 'active',
      empty: 'empty',
      focus: 'focus',
      hidden: 'hidden',
      loading: 'loading',
      results: 'results',
      pressed: 'down'
    },
    error: {
      source: 'Cannot search. No source used, and Semantic API module was not included',
      noResults: 'Your search returned no results',
      logging: 'Error in debug logging, exiting.',
      noEndpoint: 'No search endpoint was specified',
      noTemplate: 'A valid template name was not specified.',
      oldSearchSyntax: 'searchFullText setting has been renamed fullTextSearch for consistency, please adjust your settings.',
      serverError: 'There was an issue querying the server.',
      maxResults: 'Results must be an array to use maxResults setting',
      method: 'The method you called is not defined.'
    },
    metadata: {
      cache: 'cache',
      results: 'results',
      result: 'result'
    },
    regExp: {
      escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
      beginsWith: '(?:\s|^)'
    },
    // maps api response attributes to internal representation
    fields: {
      categories: 'results',
      // array of categories (category view)
      categoryName: 'name',
      // name of category (category view)
      categoryResults: 'results',
      // array of results (category view)
      description: 'description',
      // result description
      image: 'image',
      // result image
      price: 'price',
      // result price
      results: 'results',
      // array of results (standard)
      title: 'title',
      // result title
      url: 'url',
      // result url
      action: 'action',
      // "view more" object name
      actionText: 'text',
      // "view more" text
      actionURL: 'url' // "view more" url

    },
    selector: {
      prompt: '.prompt',
      searchButton: '.search.button',
      results: '.results',
      message: '.results > .message',
      category: '.category',
      result: '.result',
      title: '.title, .name'
    },
    templates: {
      escape: function escape(string) {
        var badChars = /[&<>"'`]/g,
            shouldEscape = /[&<>"'`]/,
            escape = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "`": "&#x60;"
        },
            escapedChar = function escapedChar(chr) {
          return escape[chr];
        };

        if (shouldEscape.test(string)) {
          return string.replace(badChars, escapedChar);
        }

        return string;
      },
      message: function message(_message3, type) {
        var html = '';

        if (_message3 !== undefined && type !== undefined) {
          html += '' + '<div class="message ' + type + '">'; // message type

          if (type == 'empty') {
            html += '' + '<div class="header">No Results</div class="header">' + '<div class="description">' + _message3 + '</div class="description">';
          } else {
            html += ' <div class="description">' + _message3 + '</div>';
          }

          html += '</div>';
        }

        return html;
      },
      category: function category(response, fields) {
        var html = '',
            escape = $.fn.search.settings.templates.escape;

        if (response[fields.categoryResults] !== undefined) {
          // each category
          $.each(response[fields.categoryResults], function (index, category) {
            if (category[fields.results] !== undefined && category.results.length > 0) {
              html += '<div class="category">';

              if (category[fields.categoryName] !== undefined) {
                html += '<div class="name">' + category[fields.categoryName] + '</div>';
              } // each item inside category


              html += '<div class="results">';
              $.each(category.results, function (index, result) {
                if (result[fields.url]) {
                  html += '<a class="result" href="' + result[fields.url] + '">';
                } else {
                  html += '<a class="result">';
                }

                if (result[fields.image] !== undefined) {
                  html += '' + '<div class="image">' + ' <img src="' + result[fields.image] + '">' + '</div>';
                }

                html += '<div class="content">';

                if (result[fields.price] !== undefined) {
                  html += '<div class="price">' + result[fields.price] + '</div>';
                }

                if (result[fields.title] !== undefined) {
                  html += '<div class="title">' + result[fields.title] + '</div>';
                }

                if (result[fields.description] !== undefined) {
                  html += '<div class="description">' + result[fields.description] + '</div>';
                }

                html += '' + '</div>';
                html += '</a>';
              });
              html += '</div>';
              html += '' + '</div>';
            }
          });

          if (response[fields.action]) {
            html += '' + '<a href="' + response[fields.action][fields.actionURL] + '" class="action">' + response[fields.action][fields.actionText] + '</a>';
          }

          return html;
        }

        return false;
      },
      standard: function standard(response, fields) {
        var html = '';

        if (response[fields.results] !== undefined) {
          // each result
          $.each(response[fields.results], function (index, result) {
            if (result[fields.url]) {
              html += '<a class="result" href="' + result[fields.url] + '">';
            } else {
              html += '<a class="result">';
            }

            if (result[fields.image] !== undefined) {
              html += '' + '<div class="image">' + ' <img src="' + result[fields.image] + '">' + '</div>';
            }

            html += '<div class="content">';

            if (result[fields.price] !== undefined) {
              html += '<div class="price">' + result[fields.price] + '</div>';
            }

            if (result[fields.title] !== undefined) {
              html += '<div class="title">' + result[fields.title] + '</div>';
            }

            if (result[fields.description] !== undefined) {
              html += '<div class="description">' + result[fields.description] + '</div>';
            }

            html += '' + '</div>';
            html += '</a>';
          });

          if (response[fields.action]) {
            html += '' + '<a href="' + response[fields.action][fields.actionURL] + '" class="action">' + response[fields.action][fields.actionText] + '</a>';
          }

          return html;
        }

        return false;
      }
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Shape
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.shape = function (parameters) {
    var $allModules = $(this),
        $body = $('body'),
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      setTimeout(callback, 0);
    },
        returnedValue;

    $allModules.each(function () {
      var moduleSelector = $allModules.selector || '',
          settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.shape.settings, parameters) : $.extend({}, $.fn.shape.settings),
          // internal aliases
      namespace = settings.namespace,
          selector = settings.selector,
          error = settings.error,
          className = settings.className,
          // define namespaces for modules
      eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          // selector cache
      $module = $(this),
          $sides = $module.find(selector.sides),
          $side = $module.find(selector.side),
          // private variables
      nextIndex = false,
          $activeSide,
          $nextSide,
          // standard module
      element = this,
          instance = $module.data(moduleNamespace),
          module;
      module = {
        initialize: function initialize() {
          module.verbose('Initializing module for', element);
          module.set.defaultSide();
          module.instantiate();
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module.data(moduleNamespace, instance);
        },
        destroy: function destroy() {
          module.verbose('Destroying previous module for', element);
          $module.removeData(moduleNamespace).off(eventNamespace);
        },
        refresh: function refresh() {
          module.verbose('Refreshing selector cache for', element);
          $module = $(element);
          $sides = $(this).find(selector.shape);
          $side = $(this).find(selector.side);
        },
        repaint: function repaint() {
          module.verbose('Forcing repaint event');
          var shape = $sides[0] || document.createElement('div'),
              fakeAssignment = shape.offsetWidth;
        },
        animate: function animate(propertyObject, callback) {
          module.verbose('Animating box with properties', propertyObject);

          callback = callback || function (event) {
            module.verbose('Executing animation callback');

            if (event !== undefined) {
              event.stopPropagation();
            }

            module.reset();
            module.set.active();
          };

          settings.beforeChange.call($nextSide[0]);

          if (module.get.transitionEvent()) {
            module.verbose('Starting CSS animation');
            $module.addClass(className.animating);
            $sides.css(propertyObject).one(module.get.transitionEvent(), callback);
            module.set.duration(settings.duration);
            requestAnimationFrame(function () {
              $module.addClass(className.animating);
              $activeSide.addClass(className.hidden);
            });
          } else {
            callback();
          }
        },
        queue: function queue(method) {
          module.debug('Queueing animation of', method);
          $sides.one(module.get.transitionEvent(), function () {
            module.debug('Executing queued animation');
            setTimeout(function () {
              $module.shape(method);
            }, 0);
          });
        },
        reset: function reset() {
          module.verbose('Animating states reset');
          $module.removeClass(className.animating).attr('style', '').removeAttr('style'); // removeAttr style does not consistently work in safari

          $sides.attr('style', '').removeAttr('style');
          $side.attr('style', '').removeAttr('style').removeClass(className.hidden);
          $nextSide.removeClass(className.animating).attr('style', '').removeAttr('style');
        },
        is: {
          complete: function complete() {
            return $side.filter('.' + className.active)[0] == $nextSide[0];
          },
          animating: function animating() {
            return $module.hasClass(className.animating);
          }
        },
        set: {
          defaultSide: function defaultSide() {
            $activeSide = $module.find('.' + settings.className.active);
            $nextSide = $activeSide.next(selector.side).length > 0 ? $activeSide.next(selector.side) : $module.find(selector.side).first();
            nextIndex = false;
            module.verbose('Active side set to', $activeSide);
            module.verbose('Next side set to', $nextSide);
          },
          duration: function duration(_duration2) {
            _duration2 = _duration2 || settings.duration;
            _duration2 = typeof _duration2 == 'number' ? _duration2 + 'ms' : _duration2;
            module.verbose('Setting animation duration', _duration2);

            if (settings.duration || settings.duration === 0) {
              $sides.add($side).css({
                '-webkit-transition-duration': _duration2,
                '-moz-transition-duration': _duration2,
                '-ms-transition-duration': _duration2,
                '-o-transition-duration': _duration2,
                'transition-duration': _duration2
              });
            }
          },
          currentStageSize: function currentStageSize() {
            var $activeSide = $module.find('.' + settings.className.active),
                width = $activeSide.outerWidth(true),
                height = $activeSide.outerHeight(true);
            $module.css({
              width: width,
              height: height
            });
          },
          stageSize: function stageSize() {
            var $clone = $module.clone().addClass(className.loading),
                $activeSide = $clone.find('.' + settings.className.active),
                $nextSide = nextIndex ? $clone.find(selector.side).eq(nextIndex) : $activeSide.next(selector.side).length > 0 ? $activeSide.next(selector.side) : $clone.find(selector.side).first(),
                newWidth = settings.width == 'next' ? $nextSide.outerWidth(true) : settings.width == 'initial' ? $module.width() : settings.width,
                newHeight = settings.height == 'next' ? $nextSide.outerHeight(true) : settings.height == 'initial' ? $module.height() : settings.height;
            $activeSide.removeClass(className.active);
            $nextSide.addClass(className.active);
            $clone.insertAfter($module);
            $clone.remove();

            if (settings.width != 'auto') {
              $module.css('width', newWidth + settings.jitter);
              module.verbose('Specifying width during animation', newWidth);
            }

            if (settings.height != 'auto') {
              $module.css('height', newHeight + settings.jitter);
              module.verbose('Specifying height during animation', newHeight);
            }
          },
          nextSide: function nextSide(selector) {
            nextIndex = selector;
            $nextSide = $side.filter(selector);
            nextIndex = $side.index($nextSide);

            if ($nextSide.length === 0) {
              module.set.defaultSide();
              module.error(error.side);
            }

            module.verbose('Next side manually set to', $nextSide);
          },
          active: function active() {
            module.verbose('Setting new side to active', $nextSide);
            $side.removeClass(className.active);
            $nextSide.addClass(className.active);
            settings.onChange.call($nextSide[0]);
            module.set.defaultSide();
          }
        },
        flip: {
          up: function up() {
            if (module.is.complete() && !module.is.animating() && !settings.allowRepeats) {
              module.debug('Side already visible', $nextSide);
              return;
            }

            if (!module.is.animating()) {
              module.debug('Flipping up', $nextSide);
              var transform = module.get.transform.up();
              module.set.stageSize();
              module.stage.above();
              module.animate(transform);
            } else {
              module.queue('flip up');
            }
          },
          down: function down() {
            if (module.is.complete() && !module.is.animating() && !settings.allowRepeats) {
              module.debug('Side already visible', $nextSide);
              return;
            }

            if (!module.is.animating()) {
              module.debug('Flipping down', $nextSide);
              var transform = module.get.transform.down();
              module.set.stageSize();
              module.stage.below();
              module.animate(transform);
            } else {
              module.queue('flip down');
            }
          },
          left: function left() {
            if (module.is.complete() && !module.is.animating() && !settings.allowRepeats) {
              module.debug('Side already visible', $nextSide);
              return;
            }

            if (!module.is.animating()) {
              module.debug('Flipping left', $nextSide);
              var transform = module.get.transform.left();
              module.set.stageSize();
              module.stage.left();
              module.animate(transform);
            } else {
              module.queue('flip left');
            }
          },
          right: function right() {
            if (module.is.complete() && !module.is.animating() && !settings.allowRepeats) {
              module.debug('Side already visible', $nextSide);
              return;
            }

            if (!module.is.animating()) {
              module.debug('Flipping right', $nextSide);
              var transform = module.get.transform.right();
              module.set.stageSize();
              module.stage.right();
              module.animate(transform);
            } else {
              module.queue('flip right');
            }
          },
          over: function over() {
            if (module.is.complete() && !module.is.animating() && !settings.allowRepeats) {
              module.debug('Side already visible', $nextSide);
              return;
            }

            if (!module.is.animating()) {
              module.debug('Flipping over', $nextSide);
              module.set.stageSize();
              module.stage.behind();
              module.animate(module.get.transform.over());
            } else {
              module.queue('flip over');
            }
          },
          back: function back() {
            if (module.is.complete() && !module.is.animating() && !settings.allowRepeats) {
              module.debug('Side already visible', $nextSide);
              return;
            }

            if (!module.is.animating()) {
              module.debug('Flipping back', $nextSide);
              module.set.stageSize();
              module.stage.behind();
              module.animate(module.get.transform.back());
            } else {
              module.queue('flip back');
            }
          }
        },
        get: {
          transform: {
            up: function up() {
              var translate = {
                y: -(($activeSide.outerHeight(true) - $nextSide.outerHeight(true)) / 2),
                z: -($activeSide.outerHeight(true) / 2)
              };
              return {
                transform: 'translateY(' + translate.y + 'px) translateZ(' + translate.z + 'px) rotateX(-90deg)'
              };
            },
            down: function down() {
              var translate = {
                y: -(($activeSide.outerHeight(true) - $nextSide.outerHeight(true)) / 2),
                z: -($activeSide.outerHeight(true) / 2)
              };
              return {
                transform: 'translateY(' + translate.y + 'px) translateZ(' + translate.z + 'px) rotateX(90deg)'
              };
            },
            left: function left() {
              var translate = {
                x: -(($activeSide.outerWidth(true) - $nextSide.outerWidth(true)) / 2),
                z: -($activeSide.outerWidth(true) / 2)
              };
              return {
                transform: 'translateX(' + translate.x + 'px) translateZ(' + translate.z + 'px) rotateY(90deg)'
              };
            },
            right: function right() {
              var translate = {
                x: -(($activeSide.outerWidth(true) - $nextSide.outerWidth(true)) / 2),
                z: -($activeSide.outerWidth(true) / 2)
              };
              return {
                transform: 'translateX(' + translate.x + 'px) translateZ(' + translate.z + 'px) rotateY(-90deg)'
              };
            },
            over: function over() {
              var translate = {
                x: -(($activeSide.outerWidth(true) - $nextSide.outerWidth(true)) / 2)
              };
              return {
                transform: 'translateX(' + translate.x + 'px) rotateY(180deg)'
              };
            },
            back: function back() {
              var translate = {
                x: -(($activeSide.outerWidth(true) - $nextSide.outerWidth(true)) / 2)
              };
              return {
                transform: 'translateX(' + translate.x + 'px) rotateY(-180deg)'
              };
            }
          },
          transitionEvent: function transitionEvent() {
            var element = document.createElement('element'),
                transitions = {
              'transition': 'transitionend',
              'OTransition': 'oTransitionEnd',
              'MozTransition': 'transitionend',
              'WebkitTransition': 'webkitTransitionEnd'
            },
                transition;

            for (transition in transitions) {
              if (element.style[transition] !== undefined) {
                return transitions[transition];
              }
            }
          },
          nextSide: function nextSide() {
            return $activeSide.next(selector.side).length > 0 ? $activeSide.next(selector.side) : $module.find(selector.side).first();
          }
        },
        stage: {
          above: function above() {
            var box = {
              origin: ($activeSide.outerHeight(true) - $nextSide.outerHeight(true)) / 2,
              depth: {
                active: $nextSide.outerHeight(true) / 2,
                next: $activeSide.outerHeight(true) / 2
              }
            };
            module.verbose('Setting the initial animation position as above', $nextSide, box);
            $sides.css({
              'transform': 'translateZ(-' + box.depth.active + 'px)'
            });
            $activeSide.css({
              'transform': 'rotateY(0deg) translateZ(' + box.depth.active + 'px)'
            });
            $nextSide.addClass(className.animating).css({
              'top': box.origin + 'px',
              'transform': 'rotateX(90deg) translateZ(' + box.depth.next + 'px)'
            });
          },
          below: function below() {
            var box = {
              origin: ($activeSide.outerHeight(true) - $nextSide.outerHeight(true)) / 2,
              depth: {
                active: $nextSide.outerHeight(true) / 2,
                next: $activeSide.outerHeight(true) / 2
              }
            };
            module.verbose('Setting the initial animation position as below', $nextSide, box);
            $sides.css({
              'transform': 'translateZ(-' + box.depth.active + 'px)'
            });
            $activeSide.css({
              'transform': 'rotateY(0deg) translateZ(' + box.depth.active + 'px)'
            });
            $nextSide.addClass(className.animating).css({
              'top': box.origin + 'px',
              'transform': 'rotateX(-90deg) translateZ(' + box.depth.next + 'px)'
            });
          },
          left: function left() {
            var height = {
              active: $activeSide.outerWidth(true),
              next: $nextSide.outerWidth(true)
            },
                box = {
              origin: (height.active - height.next) / 2,
              depth: {
                active: height.next / 2,
                next: height.active / 2
              }
            };
            module.verbose('Setting the initial animation position as left', $nextSide, box);
            $sides.css({
              'transform': 'translateZ(-' + box.depth.active + 'px)'
            });
            $activeSide.css({
              'transform': 'rotateY(0deg) translateZ(' + box.depth.active + 'px)'
            });
            $nextSide.addClass(className.animating).css({
              'left': box.origin + 'px',
              'transform': 'rotateY(-90deg) translateZ(' + box.depth.next + 'px)'
            });
          },
          right: function right() {
            var height = {
              active: $activeSide.outerWidth(true),
              next: $nextSide.outerWidth(true)
            },
                box = {
              origin: (height.active - height.next) / 2,
              depth: {
                active: height.next / 2,
                next: height.active / 2
              }
            };
            module.verbose('Setting the initial animation position as left', $nextSide, box);
            $sides.css({
              'transform': 'translateZ(-' + box.depth.active + 'px)'
            });
            $activeSide.css({
              'transform': 'rotateY(0deg) translateZ(' + box.depth.active + 'px)'
            });
            $nextSide.addClass(className.animating).css({
              'left': box.origin + 'px',
              'transform': 'rotateY(90deg) translateZ(' + box.depth.next + 'px)'
            });
          },
          behind: function behind() {
            var height = {
              active: $activeSide.outerWidth(true),
              next: $nextSide.outerWidth(true)
            },
                box = {
              origin: (height.active - height.next) / 2,
              depth: {
                active: height.next / 2,
                next: height.active / 2
              }
            };
            module.verbose('Setting the initial animation position as behind', $nextSide, box);
            $activeSide.css({
              'transform': 'rotateY(0deg)'
            });
            $nextSide.addClass(className.animating).css({
              'left': box.origin + 'px',
              'transform': 'rotateY(-180deg)'
            });
          }
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ($allModules.length > 1) {
              title += ' ' + '(' + $allModules.length + ')';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.shape.settings = {
    // module info
    name: 'Shape',
    // hide all debug content
    silent: false,
    // debug content outputted to console
    debug: false,
    // verbose debug output
    verbose: false,
    // fudge factor in pixels when swapping from 2d to 3d (can be useful to correct rounding errors)
    jitter: 0,
    // performance data output
    performance: true,
    // event namespace
    namespace: 'shape',
    // width during animation, can be set to 'auto', initial', 'next' or pixel amount
    width: 'initial',
    // height during animation, can be set to 'auto', 'initial', 'next' or pixel amount
    height: 'initial',
    // callback occurs on side change
    beforeChange: function beforeChange() {},
    onChange: function onChange() {},
    // allow animation to same side
    allowRepeats: false,
    // animation duration
    duration: false,
    // possible errors
    error: {
      side: 'You tried to switch to a side that does not exist.',
      method: 'The method you called is not defined'
    },
    // classnames used
    className: {
      animating: 'animating',
      hidden: 'hidden',
      loading: 'loading',
      active: 'active'
    },
    // selectors used
    selector: {
      sides: '.sides',
      side: '.side'
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Sidebar
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.sidebar = function (parameters) {
    var $allModules = $(this),
        $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      setTimeout(callback, 0);
    },
        returnedValue;

    $allModules.each(function () {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.sidebar.settings, parameters) : $.extend({}, $.fn.sidebar.settings),
          selector = settings.selector,
          className = settings.className,
          namespace = settings.namespace,
          regExp = settings.regExp,
          error = settings.error,
          eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          $module = $(this),
          $context = $(settings.context),
          $sidebars = $module.children(selector.sidebar),
          $fixed = $context.children(selector.fixed),
          $pusher = $context.children(selector.pusher),
          $style,
          element = this,
          instance = $module.data(moduleNamespace),
          elementNamespace,
          _id4,
          currentScroll,
          transitionEvent,
          module;

      module = {
        initialize: function initialize() {
          module.debug('Initializing sidebar', parameters);
          module.create.id();
          transitionEvent = module.get.transitionEvent(); // avoids locking rendering if initialized in onReady

          if (settings.delaySetup) {
            requestAnimationFrame(module.setup.layout);
          } else {
            module.setup.layout();
          }

          requestAnimationFrame(function () {
            module.setup.cache();
          });
          module.instantiate();
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module.data(moduleNamespace, module);
        },
        create: {
          id: function id() {
            _id4 = (Math.random().toString(16) + '000000000').substr(2, 8);
            elementNamespace = '.' + _id4;
            module.verbose('Creating unique id for element', _id4);
          }
        },
        destroy: function destroy() {
          module.verbose('Destroying previous module for', $module);
          $module.off(eventNamespace).removeData(moduleNamespace);

          if (module.is.ios()) {
            module.remove.ios();
          } // bound by uuid


          $context.off(elementNamespace);
          $window.off(elementNamespace);
          $document.off(elementNamespace);
        },
        event: {
          clickaway: function clickaway(event) {
            var clickedInPusher = $pusher.find(event.target).length > 0 || $pusher.is(event.target),
                clickedContext = $context.is(event.target);

            if (clickedInPusher) {
              module.verbose('User clicked on dimmed page');
              module.hide();
            }

            if (clickedContext) {
              module.verbose('User clicked on dimmable context (scaled out page)');
              module.hide();
            }
          },
          touch: function touch(event) {//event.stopPropagation();
          },
          containScroll: function containScroll(event) {
            if (element.scrollTop <= 0) {
              element.scrollTop = 1;
            }

            if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
              element.scrollTop = element.scrollHeight - element.offsetHeight - 1;
            }
          },
          scroll: function scroll(event) {
            if ($(event.target).closest(selector.sidebar).length === 0) {
              event.preventDefault();
            }
          }
        },
        bind: {
          clickaway: function clickaway() {
            module.verbose('Adding clickaway events to context', $context);

            if (settings.closable) {
              $context.on('click' + elementNamespace, module.event.clickaway).on('touchend' + elementNamespace, module.event.clickaway);
            }
          },
          scrollLock: function scrollLock() {
            if (settings.scrollLock) {
              module.debug('Disabling page scroll');
              $window.on('DOMMouseScroll' + elementNamespace, module.event.scroll);
            }

            module.verbose('Adding events to contain sidebar scroll');
            $document.on('touchmove' + elementNamespace, module.event.touch);
            $module.on('scroll' + eventNamespace, module.event.containScroll);
          }
        },
        unbind: {
          clickaway: function clickaway() {
            module.verbose('Removing clickaway events from context', $context);
            $context.off(elementNamespace);
          },
          scrollLock: function scrollLock() {
            module.verbose('Removing scroll lock from page');
            $document.off(elementNamespace);
            $window.off(elementNamespace);
            $module.off('scroll' + eventNamespace);
          }
        },
        add: {
          inlineCSS: function inlineCSS() {
            var width = module.cache.width || $module.outerWidth(),
                height = module.cache.height || $module.outerHeight(),
                isRTL = module.is.rtl(),
                direction = module.get.direction(),
                distance = {
              left: width,
              right: -width,
              top: height,
              bottom: -height
            },
                style;

            if (isRTL) {
              module.verbose('RTL detected, flipping widths');
              distance.left = -width;
              distance.right = width;
            }

            style = '<style>';

            if (direction === 'left' || direction === 'right') {
              module.debug('Adding CSS rules for animation distance', width);
              style += '' + ' .ui.visible.' + direction + '.sidebar ~ .fixed,' + ' .ui.visible.' + direction + '.sidebar ~ .pusher {' + '   -webkit-transform: translate3d(' + distance[direction] + 'px, 0, 0);' + '           transform: translate3d(' + distance[direction] + 'px, 0, 0);' + ' }';
            } else if (direction === 'top' || direction == 'bottom') {
              style += '' + ' .ui.visible.' + direction + '.sidebar ~ .fixed,' + ' .ui.visible.' + direction + '.sidebar ~ .pusher {' + '   -webkit-transform: translate3d(0, ' + distance[direction] + 'px, 0);' + '           transform: translate3d(0, ' + distance[direction] + 'px, 0);' + ' }';
            }
            /* IE is only browser not to create context with transforms */

            /* https://www.w3.org/Bugs/Public/show_bug.cgi?id=16328 */


            if (module.is.ie()) {
              if (direction === 'left' || direction === 'right') {
                module.debug('Adding CSS rules for animation distance', width);
                style += '' + ' body.pushable > .ui.visible.' + direction + '.sidebar ~ .pusher:after {' + '   -webkit-transform: translate3d(' + distance[direction] + 'px, 0, 0);' + '           transform: translate3d(' + distance[direction] + 'px, 0, 0);' + ' }';
              } else if (direction === 'top' || direction == 'bottom') {
                style += '' + ' body.pushable > .ui.visible.' + direction + '.sidebar ~ .pusher:after {' + '   -webkit-transform: translate3d(0, ' + distance[direction] + 'px, 0);' + '           transform: translate3d(0, ' + distance[direction] + 'px, 0);' + ' }';
              }
              /* opposite sides visible forces content overlay */


              style += '' + ' body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after,' + ' body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {' + '   -webkit-transform: translate3d(0px, 0, 0);' + '           transform: translate3d(0px, 0, 0);' + ' }';
            }

            style += '</style>';
            $style = $(style).appendTo($head);
            module.debug('Adding sizing css to head', $style);
          }
        },
        refresh: function refresh() {
          module.verbose('Refreshing selector cache');
          $context = $(settings.context);
          $sidebars = $context.children(selector.sidebar);
          $pusher = $context.children(selector.pusher);
          $fixed = $context.children(selector.fixed);
          module.clear.cache();
        },
        refreshSidebars: function refreshSidebars() {
          module.verbose('Refreshing other sidebars');
          $sidebars = $context.children(selector.sidebar);
        },
        repaint: function repaint() {
          module.verbose('Forcing repaint event');
          element.style.display = 'none';
          var ignored = element.offsetHeight;
          element.scrollTop = element.scrollTop;
          element.style.display = '';
        },
        setup: {
          cache: function cache() {
            module.cache = {
              width: $module.outerWidth(),
              height: $module.outerHeight(),
              rtl: $module.css('direction') == 'rtl'
            };
          },
          layout: function layout() {
            if ($context.children(selector.pusher).length === 0) {
              module.debug('Adding wrapper element for sidebar');
              module.error(error.pusher);
              $pusher = $('<div class="pusher" />');
              $context.children().not(selector.omitted).not($sidebars).wrapAll($pusher);
              module.refresh();
            }

            if ($module.nextAll(selector.pusher).length === 0 || $module.nextAll(selector.pusher)[0] !== $pusher[0]) {
              module.debug('Moved sidebar to correct parent element');
              module.error(error.movedSidebar, element);
              $module.detach().prependTo($context);
              module.refresh();
            }

            module.clear.cache();
            module.set.pushable();
            module.set.direction();
          }
        },
        attachEvents: function attachEvents(selector, event) {
          var $toggle = $(selector);
          event = $.isFunction(module[event]) ? module[event] : module.toggle;

          if ($toggle.length > 0) {
            module.debug('Attaching sidebar events to element', selector, event);
            $toggle.on('click' + eventNamespace, event);
          } else {
            module.error(error.notFound, selector);
          }
        },
        show: function show(callback) {
          callback = $.isFunction(callback) ? callback : function () {};

          if (module.is.hidden()) {
            module.refreshSidebars();

            if (settings.overlay) {
              module.error(error.overlay);
              settings.transition = 'overlay';
            }

            module.refresh();

            if (module.othersActive()) {
              module.debug('Other sidebars currently visible');

              if (settings.exclusive) {
                // if not overlay queue animation after hide
                if (settings.transition != 'overlay') {
                  module.hideOthers(module.show);
                  return;
                } else {
                  module.hideOthers();
                }
              } else {
                settings.transition = 'overlay';
              }
            }

            module.pushPage(function () {
              callback.call(element);
              settings.onShow.call(element);
            });
            settings.onChange.call(element);
            settings.onVisible.call(element);
          } else {
            module.debug('Sidebar is already visible');
          }
        },
        hide: function hide(callback) {
          callback = $.isFunction(callback) ? callback : function () {};

          if (module.is.visible() || module.is.animating()) {
            module.debug('Hiding sidebar', callback);
            module.refreshSidebars();
            module.pullPage(function () {
              callback.call(element);
              settings.onHidden.call(element);
            });
            settings.onChange.call(element);
            settings.onHide.call(element);
          }
        },
        othersAnimating: function othersAnimating() {
          return $sidebars.not($module).filter('.' + className.animating).length > 0;
        },
        othersVisible: function othersVisible() {
          return $sidebars.not($module).filter('.' + className.visible).length > 0;
        },
        othersActive: function othersActive() {
          return module.othersVisible() || module.othersAnimating();
        },
        hideOthers: function hideOthers(callback) {
          var $otherSidebars = $sidebars.not($module).filter('.' + className.visible),
              sidebarCount = $otherSidebars.length,
              callbackCount = 0;

          callback = callback || function () {};

          $otherSidebars.sidebar('hide', function () {
            callbackCount++;

            if (callbackCount == sidebarCount) {
              callback();
            }
          });
        },
        toggle: function toggle() {
          module.verbose('Determining toggled direction');

          if (module.is.hidden()) {
            module.show();
          } else {
            module.hide();
          }
        },
        pushPage: function pushPage(callback) {
          var transition = module.get.transition(),
              $transition = transition === 'overlay' || module.othersActive() ? $module : $pusher,
              animate,
              dim,
              _transitionEnd;

          callback = $.isFunction(callback) ? callback : function () {};

          if (settings.transition == 'scale down') {
            module.scrollToTop();
          }

          module.set.transition(transition);
          module.repaint();

          animate = function animate() {
            module.bind.clickaway();
            module.add.inlineCSS();
            module.set.animating();
            module.set.visible();
          };

          dim = function dim() {
            module.set.dimmed();
          };

          _transitionEnd = function transitionEnd(event) {
            if (event.target == $transition[0]) {
              $transition.off(transitionEvent + elementNamespace, _transitionEnd);
              module.remove.animating();
              module.bind.scrollLock();
              callback.call(element);
            }
          };

          $transition.off(transitionEvent + elementNamespace);
          $transition.on(transitionEvent + elementNamespace, _transitionEnd);
          requestAnimationFrame(animate);

          if (settings.dimPage && !module.othersVisible()) {
            requestAnimationFrame(dim);
          }
        },
        pullPage: function pullPage(callback) {
          var transition = module.get.transition(),
              $transition = transition == 'overlay' || module.othersActive() ? $module : $pusher,
              animate,
              _transitionEnd2;

          callback = $.isFunction(callback) ? callback : function () {};
          module.verbose('Removing context push state', module.get.direction());
          module.unbind.clickaway();
          module.unbind.scrollLock();

          animate = function animate() {
            module.set.transition(transition);
            module.set.animating();
            module.remove.visible();

            if (settings.dimPage && !module.othersVisible()) {
              $pusher.removeClass(className.dimmed);
            }
          };

          _transitionEnd2 = function transitionEnd(event) {
            if (event.target == $transition[0]) {
              $transition.off(transitionEvent + elementNamespace, _transitionEnd2);
              module.remove.animating();
              module.remove.transition();
              module.remove.inlineCSS();

              if (transition == 'scale down' || settings.returnScroll && module.is.mobile()) {
                module.scrollBack();
              }

              callback.call(element);
            }
          };

          $transition.off(transitionEvent + elementNamespace);
          $transition.on(transitionEvent + elementNamespace, _transitionEnd2);
          requestAnimationFrame(animate);
        },
        scrollToTop: function scrollToTop() {
          module.verbose('Scrolling to top of page to avoid animation issues');
          currentScroll = $(window).scrollTop();
          $module.scrollTop(0);
          window.scrollTo(0, 0);
        },
        scrollBack: function scrollBack() {
          module.verbose('Scrolling back to original page position');
          window.scrollTo(0, currentScroll);
        },
        clear: {
          cache: function cache() {
            module.verbose('Clearing cached dimensions');
            module.cache = {};
          }
        },
        set: {
          // ios only (scroll on html not document). This prevent auto-resize canvas/scroll in ios
          // (This is no longer necessary in latest iOS)
          ios: function ios() {
            $html.addClass(className.ios);
          },
          // container
          pushed: function pushed() {
            $context.addClass(className.pushed);
          },
          pushable: function pushable() {
            $context.addClass(className.pushable);
          },
          // pusher
          dimmed: function dimmed() {
            $pusher.addClass(className.dimmed);
          },
          // sidebar
          active: function active() {
            $module.addClass(className.active);
          },
          animating: function animating() {
            $module.addClass(className.animating);
          },
          transition: function transition(_transition) {
            _transition = _transition || module.get.transition();
            $module.addClass(_transition);
          },
          direction: function direction(_direction) {
            _direction = _direction || module.get.direction();
            $module.addClass(className[_direction]);
          },
          visible: function visible() {
            $module.addClass(className.visible);
          },
          overlay: function overlay() {
            $module.addClass(className.overlay);
          }
        },
        remove: {
          inlineCSS: function inlineCSS() {
            module.debug('Removing inline css styles', $style);

            if ($style && $style.length > 0) {
              $style.remove();
            }
          },
          // ios scroll on html not document
          ios: function ios() {
            $html.removeClass(className.ios);
          },
          // context
          pushed: function pushed() {
            $context.removeClass(className.pushed);
          },
          pushable: function pushable() {
            $context.removeClass(className.pushable);
          },
          // sidebar
          active: function active() {
            $module.removeClass(className.active);
          },
          animating: function animating() {
            $module.removeClass(className.animating);
          },
          transition: function transition(_transition2) {
            _transition2 = _transition2 || module.get.transition();
            $module.removeClass(_transition2);
          },
          direction: function direction(_direction2) {
            _direction2 = _direction2 || module.get.direction();
            $module.removeClass(className[_direction2]);
          },
          visible: function visible() {
            $module.removeClass(className.visible);
          },
          overlay: function overlay() {
            $module.removeClass(className.overlay);
          }
        },
        get: {
          direction: function direction() {
            if ($module.hasClass(className.top)) {
              return className.top;
            } else if ($module.hasClass(className.right)) {
              return className.right;
            } else if ($module.hasClass(className.bottom)) {
              return className.bottom;
            }

            return className.left;
          },
          transition: function transition() {
            var direction = module.get.direction(),
                transition;
            transition = module.is.mobile() ? settings.mobileTransition == 'auto' ? settings.defaultTransition.mobile[direction] : settings.mobileTransition : settings.transition == 'auto' ? settings.defaultTransition.computer[direction] : settings.transition;
            module.verbose('Determined transition', transition);
            return transition;
          },
          transitionEvent: function transitionEvent() {
            var element = document.createElement('element'),
                transitions = {
              'transition': 'transitionend',
              'OTransition': 'oTransitionEnd',
              'MozTransition': 'transitionend',
              'WebkitTransition': 'webkitTransitionEnd'
            },
                transition;

            for (transition in transitions) {
              if (element.style[transition] !== undefined) {
                return transitions[transition];
              }
            }
          }
        },
        is: {
          ie: function ie() {
            var isIE11 = !window.ActiveXObject && 'ActiveXObject' in window,
                isIE = 'ActiveXObject' in window;
            return isIE11 || isIE;
          },
          ios: function ios() {
            var userAgent = navigator.userAgent,
                isIOS = userAgent.match(regExp.ios),
                isMobileChrome = userAgent.match(regExp.mobileChrome);

            if (isIOS && !isMobileChrome) {
              module.verbose('Browser was found to be iOS', userAgent);
              return true;
            } else {
              return false;
            }
          },
          mobile: function mobile() {
            var userAgent = navigator.userAgent,
                isMobile = userAgent.match(regExp.mobile);

            if (isMobile) {
              module.verbose('Browser was found to be mobile', userAgent);
              return true;
            } else {
              module.verbose('Browser is not mobile, using regular transition', userAgent);
              return false;
            }
          },
          hidden: function hidden() {
            return !module.is.visible();
          },
          visible: function visible() {
            return $module.hasClass(className.visible);
          },
          // alias
          open: function open() {
            return module.is.visible();
          },
          closed: function closed() {
            return module.is.hidden();
          },
          vertical: function vertical() {
            return $module.hasClass(className.top);
          },
          animating: function animating() {
            return $context.hasClass(className.animating);
          },
          rtl: function rtl() {
            if (module.cache.rtl === undefined) {
              module.cache.rtl = $module.css('direction') == 'rtl';
            }

            return module.cache.rtl;
          }
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                module.error(error.method, query);
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          module.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.sidebar.settings = {
    name: 'Sidebar',
    namespace: 'sidebar',
    silent: false,
    debug: false,
    verbose: false,
    performance: true,
    transition: 'auto',
    mobileTransition: 'auto',
    defaultTransition: {
      computer: {
        left: 'uncover',
        right: 'uncover',
        top: 'overlay',
        bottom: 'overlay'
      },
      mobile: {
        left: 'uncover',
        right: 'uncover',
        top: 'overlay',
        bottom: 'overlay'
      }
    },
    context: 'body',
    exclusive: false,
    closable: true,
    dimPage: true,
    scrollLock: false,
    returnScroll: false,
    delaySetup: false,
    duration: 500,
    onChange: function onChange() {},
    onShow: function onShow() {},
    onHide: function onHide() {},
    onHidden: function onHidden() {},
    onVisible: function onVisible() {},
    className: {
      active: 'active',
      animating: 'animating',
      dimmed: 'dimmed',
      ios: 'ios',
      pushable: 'pushable',
      pushed: 'pushed',
      right: 'right',
      top: 'top',
      left: 'left',
      bottom: 'bottom',
      visible: 'visible'
    },
    selector: {
      fixed: '.fixed',
      omitted: 'script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed',
      pusher: '.pusher',
      sidebar: '.ui.sidebar'
    },
    regExp: {
      ios: /(iPad|iPhone|iPod)/g,
      mobileChrome: /(CriOS)/g,
      mobile: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g
    },
    error: {
      method: 'The method you called is not defined.',
      pusher: 'Had to add pusher element. For optimal performance make sure body content is inside a pusher element',
      movedSidebar: 'Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag',
      overlay: 'The overlay setting is no longer supported, use animation: overlay',
      notFound: 'There were no elements that matched the specified selector'
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Sticky
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.sticky = function (parameters) {
    var $allModules = $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;
    $allModules.each(function () {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.sticky.settings, parameters) : $.extend({}, $.fn.sticky.settings),
          className = settings.className,
          namespace = settings.namespace,
          error = settings.error,
          eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          $module = $(this),
          $window = $(window),
          $scroll = $(settings.scrollContext),
          $container,
          $context,
          selector = $module.selector || '',
          instance = $module.data(moduleNamespace),
          requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        setTimeout(callback, 0);
      },
          element = this,
          documentObserver,
          observer,
          module;

      module = {
        initialize: function initialize() {
          module.determineContainer();
          module.determineContext();
          module.verbose('Initializing sticky', settings, $container);
          module.save.positions();
          module.checkErrors();
          module.bind.events();

          if (settings.observeChanges) {
            module.observeChanges();
          }

          module.instantiate();
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module.data(moduleNamespace, module);
        },
        destroy: function destroy() {
          module.verbose('Destroying previous instance');
          module.reset();

          if (documentObserver) {
            documentObserver.disconnect();
          }

          if (observer) {
            observer.disconnect();
          }

          $window.off('load' + eventNamespace, module.event.load).off('resize' + eventNamespace, module.event.resize);
          $scroll.off('scrollchange' + eventNamespace, module.event.scrollchange);
          $module.removeData(moduleNamespace);
        },
        observeChanges: function observeChanges() {
          if ('MutationObserver' in window) {
            documentObserver = new MutationObserver(module.event.documentChanged);
            observer = new MutationObserver(module.event.changed);
            documentObserver.observe(document, {
              childList: true,
              subtree: true
            });
            observer.observe(element, {
              childList: true,
              subtree: true
            });
            observer.observe($context[0], {
              childList: true,
              subtree: true
            });
            module.debug('Setting up mutation observer', observer);
          }
        },
        determineContainer: function determineContainer() {
          if (settings.container) {
            $container = $(settings.container);
          } else {
            $container = $module.offsetParent();
          }
        },
        determineContext: function determineContext() {
          if (settings.context) {
            $context = $(settings.context);
          } else {
            $context = $container;
          }

          if ($context.length === 0) {
            module.error(error.invalidContext, settings.context, $module);
            return;
          }
        },
        checkErrors: function checkErrors() {
          if (module.is.hidden()) {
            module.error(error.visible, $module);
          }

          if (module.cache.element.height > module.cache.context.height) {
            module.reset();
            module.error(error.elementSize, $module);
            return;
          }
        },
        bind: {
          events: function events() {
            $window.on('load' + eventNamespace, module.event.load).on('resize' + eventNamespace, module.event.resize); // pub/sub pattern

            $scroll.off('scroll' + eventNamespace).on('scroll' + eventNamespace, module.event.scroll).on('scrollchange' + eventNamespace, module.event.scrollchange);
          }
        },
        event: {
          changed: function changed(mutations) {
            clearTimeout(module.timer);
            module.timer = setTimeout(function () {
              module.verbose('DOM tree modified, updating sticky menu', mutations);
              module.refresh();
            }, 100);
          },
          documentChanged: function documentChanged(mutations) {
            [].forEach.call(mutations, function (mutation) {
              if (mutation.removedNodes) {
                [].forEach.call(mutation.removedNodes, function (node) {
                  if (node == element || $(node).find(element).length > 0) {
                    module.debug('Element removed from DOM, tearing down events');
                    module.destroy();
                  }
                });
              }
            });
          },
          load: function load() {
            module.verbose('Page contents finished loading');
            requestAnimationFrame(module.refresh);
          },
          resize: function resize() {
            module.verbose('Window resized');
            requestAnimationFrame(module.refresh);
          },
          scroll: function scroll() {
            requestAnimationFrame(function () {
              $scroll.triggerHandler('scrollchange' + eventNamespace, $scroll.scrollTop());
            });
          },
          scrollchange: function scrollchange(event, scrollPosition) {
            module.stick(scrollPosition);
            settings.onScroll.call(element);
          }
        },
        refresh: function refresh(hardRefresh) {
          module.reset();

          if (!settings.context) {
            module.determineContext();
          }

          if (hardRefresh) {
            module.determineContainer();
          }

          module.save.positions();
          module.stick();
          settings.onReposition.call(element);
        },
        supports: {
          sticky: function sticky() {
            var $element = $('<div/>'),
                element = $element[0];
            $element.addClass(className.supported);
            return $element.css('position').match('sticky');
          }
        },
        save: {
          lastScroll: function lastScroll(scroll) {
            module.lastScroll = scroll;
          },
          elementScroll: function elementScroll(scroll) {
            module.elementScroll = scroll;
          },
          positions: function positions() {
            var scrollContext = {
              height: $scroll.height()
            },
                element = {
              margin: {
                top: parseInt($module.css('margin-top'), 10),
                bottom: parseInt($module.css('margin-bottom'), 10)
              },
              offset: $module.offset(),
              width: $module.outerWidth(),
              height: $module.outerHeight()
            },
                context = {
              offset: $context.offset(),
              height: $context.outerHeight()
            },
                container = {
              height: $container.outerHeight()
            };

            if (!module.is.standardScroll()) {
              module.debug('Non-standard scroll. Removing scroll offset from element offset');
              scrollContext.top = $scroll.scrollTop();
              scrollContext.left = $scroll.scrollLeft();
              element.offset.top += scrollContext.top;
              context.offset.top += scrollContext.top;
              element.offset.left += scrollContext.left;
              context.offset.left += scrollContext.left;
            }

            module.cache = {
              fits: element.height + settings.offset <= scrollContext.height,
              sameHeight: element.height == context.height,
              scrollContext: {
                height: scrollContext.height
              },
              element: {
                margin: element.margin,
                top: element.offset.top - element.margin.top,
                left: element.offset.left,
                width: element.width,
                height: element.height,
                bottom: element.offset.top + element.height
              },
              context: {
                top: context.offset.top,
                height: context.height,
                bottom: context.offset.top + context.height
              }
            };
            module.set.containerSize();
            module.stick();
            module.debug('Caching element positions', module.cache);
          }
        },
        get: {
          direction: function direction(scroll) {
            var direction = 'down';
            scroll = scroll || $scroll.scrollTop();

            if (module.lastScroll !== undefined) {
              if (module.lastScroll < scroll) {
                direction = 'down';
              } else if (module.lastScroll > scroll) {
                direction = 'up';
              }
            }

            return direction;
          },
          scrollChange: function scrollChange(scroll) {
            scroll = scroll || $scroll.scrollTop();
            return module.lastScroll ? scroll - module.lastScroll : 0;
          },
          currentElementScroll: function currentElementScroll() {
            if (module.elementScroll) {
              return module.elementScroll;
            }

            return module.is.top() ? Math.abs(parseInt($module.css('top'), 10)) || 0 : Math.abs(parseInt($module.css('bottom'), 10)) || 0;
          },
          elementScroll: function elementScroll(scroll) {
            scroll = scroll || $scroll.scrollTop();
            var element = module.cache.element,
                scrollContext = module.cache.scrollContext,
                delta = module.get.scrollChange(scroll),
                maxScroll = element.height - scrollContext.height + settings.offset,
                elementScroll = module.get.currentElementScroll(),
                possibleScroll = elementScroll + delta;

            if (module.cache.fits || possibleScroll < 0) {
              elementScroll = 0;
            } else if (possibleScroll > maxScroll) {
              elementScroll = maxScroll;
            } else {
              elementScroll = possibleScroll;
            }

            return elementScroll;
          }
        },
        remove: {
          lastScroll: function lastScroll() {
            delete module.lastScroll;
          },
          elementScroll: function elementScroll(scroll) {
            delete module.elementScroll;
          },
          minimumSize: function minimumSize() {
            $container.css('min-height', '');
          },
          offset: function offset() {
            $module.css('margin-top', '');
          }
        },
        set: {
          offset: function offset() {
            module.verbose('Setting offset on element', settings.offset);
            $module.css('margin-top', settings.offset);
          },
          containerSize: function containerSize() {
            var tagName = $container.get(0).tagName;

            if (tagName === 'HTML' || tagName == 'body') {
              // this can trigger for too many reasons
              //module.error(error.container, tagName, $module);
              module.determineContainer();
            } else {
              if (Math.abs($container.outerHeight() - module.cache.context.height) > settings.jitter) {
                module.debug('Context has padding, specifying exact height for container', module.cache.context.height);
                $container.css({
                  height: module.cache.context.height
                });
              }
            }
          },
          minimumSize: function minimumSize() {
            var element = module.cache.element;
            $container.css('min-height', element.height);
          },
          scroll: function scroll(_scroll) {
            module.debug('Setting scroll on element', _scroll);

            if (module.elementScroll == _scroll) {
              return;
            }

            if (module.is.top()) {
              $module.css('bottom', '').css('top', -_scroll);
            }

            if (module.is.bottom()) {
              $module.css('top', '').css('bottom', _scroll);
            }
          },
          size: function size() {
            if (module.cache.element.height !== 0 && module.cache.element.width !== 0) {
              element.style.setProperty('width', module.cache.element.width + 'px', 'important');
              element.style.setProperty('height', module.cache.element.height + 'px', 'important');
            }
          }
        },
        is: {
          standardScroll: function standardScroll() {
            return $scroll[0] == window;
          },
          top: function top() {
            return $module.hasClass(className.top);
          },
          bottom: function bottom() {
            return $module.hasClass(className.bottom);
          },
          initialPosition: function initialPosition() {
            return !module.is.fixed() && !module.is.bound();
          },
          hidden: function hidden() {
            return !$module.is(':visible');
          },
          bound: function bound() {
            return $module.hasClass(className.bound);
          },
          fixed: function fixed() {
            return $module.hasClass(className.fixed);
          }
        },
        stick: function stick(scroll) {
          var cachedPosition = scroll || $scroll.scrollTop(),
              cache = module.cache,
              fits = cache.fits,
              sameHeight = cache.sameHeight,
              element = cache.element,
              scrollContext = cache.scrollContext,
              context = cache.context,
              offset = module.is.bottom() && settings.pushing ? settings.bottomOffset : settings.offset,
              scroll = {
            top: cachedPosition + offset,
            bottom: cachedPosition + offset + scrollContext.height
          },
              direction = module.get.direction(scroll.top),
              elementScroll = fits ? 0 : module.get.elementScroll(scroll.top),
              // shorthand
          doesntFit = !fits,
              elementVisible = element.height !== 0;

          if (elementVisible && !sameHeight) {
            if (module.is.initialPosition()) {
              if (scroll.top >= context.bottom) {
                module.debug('Initial element position is bottom of container');
                module.bindBottom();
              } else if (scroll.top > element.top) {
                if (element.height + scroll.top - elementScroll >= context.bottom) {
                  module.debug('Initial element position is bottom of container');
                  module.bindBottom();
                } else {
                  module.debug('Initial element position is fixed');
                  module.fixTop();
                }
              }
            } else if (module.is.fixed()) {
              // currently fixed top
              if (module.is.top()) {
                if (scroll.top <= element.top) {
                  module.debug('Fixed element reached top of container');
                  module.setInitialPosition();
                } else if (element.height + scroll.top - elementScroll >= context.bottom) {
                  module.debug('Fixed element reached bottom of container');
                  module.bindBottom();
                } // scroll element if larger than screen
                else if (doesntFit) {
                    module.set.scroll(elementScroll);
                    module.save.lastScroll(scroll.top);
                    module.save.elementScroll(elementScroll);
                  }
              } // currently fixed bottom
              else if (module.is.bottom()) {
                  // top edge
                  if (scroll.bottom - element.height <= element.top) {
                    module.debug('Bottom fixed rail has reached top of container');
                    module.setInitialPosition();
                  } // bottom edge
                  else if (scroll.bottom >= context.bottom) {
                      module.debug('Bottom fixed rail has reached bottom of container');
                      module.bindBottom();
                    } // scroll element if larger than screen
                    else if (doesntFit) {
                        module.set.scroll(elementScroll);
                        module.save.lastScroll(scroll.top);
                        module.save.elementScroll(elementScroll);
                      }
                }
            } else if (module.is.bottom()) {
              if (scroll.top <= element.top) {
                module.debug('Jumped from bottom fixed to top fixed, most likely used home/end button');
                module.setInitialPosition();
              } else {
                if (settings.pushing) {
                  if (module.is.bound() && scroll.bottom <= context.bottom) {
                    module.debug('Fixing bottom attached element to bottom of browser.');
                    module.fixBottom();
                  }
                } else {
                  if (module.is.bound() && scroll.top <= context.bottom - element.height) {
                    module.debug('Fixing bottom attached element to top of browser.');
                    module.fixTop();
                  }
                }
              }
            }
          }
        },
        bindTop: function bindTop() {
          module.debug('Binding element to top of parent container');
          module.remove.offset();
          $module.css({
            left: '',
            top: '',
            marginBottom: ''
          }).removeClass(className.fixed).removeClass(className.bottom).addClass(className.bound).addClass(className.top);
          settings.onTop.call(element);
          settings.onUnstick.call(element);
        },
        bindBottom: function bindBottom() {
          module.debug('Binding element to bottom of parent container');
          module.remove.offset();
          $module.css({
            left: '',
            top: ''
          }).removeClass(className.fixed).removeClass(className.top).addClass(className.bound).addClass(className.bottom);
          settings.onBottom.call(element);
          settings.onUnstick.call(element);
        },
        setInitialPosition: function setInitialPosition() {
          module.debug('Returning to initial position');
          module.unfix();
          module.unbind();
        },
        fixTop: function fixTop() {
          module.debug('Fixing element to top of page');

          if (settings.setSize) {
            module.set.size();
          }

          module.set.minimumSize();
          module.set.offset();
          $module.css({
            left: module.cache.element.left,
            bottom: '',
            marginBottom: ''
          }).removeClass(className.bound).removeClass(className.bottom).addClass(className.fixed).addClass(className.top);
          settings.onStick.call(element);
        },
        fixBottom: function fixBottom() {
          module.debug('Sticking element to bottom of page');

          if (settings.setSize) {
            module.set.size();
          }

          module.set.minimumSize();
          module.set.offset();
          $module.css({
            left: module.cache.element.left,
            bottom: '',
            marginBottom: ''
          }).removeClass(className.bound).removeClass(className.top).addClass(className.fixed).addClass(className.bottom);
          settings.onStick.call(element);
        },
        unbind: function unbind() {
          if (module.is.bound()) {
            module.debug('Removing container bound position on element');
            module.remove.offset();
            $module.removeClass(className.bound).removeClass(className.top).removeClass(className.bottom);
          }
        },
        unfix: function unfix() {
          if (module.is.fixed()) {
            module.debug('Removing fixed position on element');
            module.remove.minimumSize();
            module.remove.offset();
            $module.removeClass(className.fixed).removeClass(className.top).removeClass(className.bottom);
            settings.onUnstick.call(element);
          }
        },
        reset: function reset() {
          module.debug('Resetting elements position');
          module.unbind();
          module.unfix();
          module.resetCSS();
          module.remove.offset();
          module.remove.lastScroll();
        },
        resetCSS: function resetCSS() {
          $module.css({
            width: '',
            height: ''
          });
          $container.css({
            height: ''
          });
        },
        setting: function setting(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            settings[name] = value;
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 0);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.sticky.settings = {
    name: 'Sticky',
    namespace: 'sticky',
    silent: false,
    debug: false,
    verbose: true,
    performance: true,
    // whether to stick in the opposite direction on scroll up
    pushing: false,
    context: false,
    container: false,
    // Context to watch scroll events
    scrollContext: window,
    // Offset to adjust scroll
    offset: 0,
    // Offset to adjust scroll when attached to bottom of screen
    bottomOffset: 0,
    // will only set container height if difference between context and container is larger than this number
    jitter: 5,
    // set width of sticky element when it is fixed to page (used to make sure 100% width is maintained if no fixed size set)
    setSize: true,
    // Whether to automatically observe changes with Mutation Observers
    observeChanges: false,
    // Called when position is recalculated
    onReposition: function onReposition() {},
    // Called on each scroll
    onScroll: function onScroll() {},
    // Called when element is stuck to viewport
    onStick: function onStick() {},
    // Called when element is unstuck from viewport
    onUnstick: function onUnstick() {},
    // Called when element reaches top of context
    onTop: function onTop() {},
    // Called when element reaches bottom of context
    onBottom: function onBottom() {},
    error: {
      container: 'Sticky element must be inside a relative container',
      visible: 'Element is hidden, you must call refresh after element becomes visible. Use silent setting to surpress this warning in production.',
      method: 'The method you called is not defined.',
      invalidContext: 'Context specified does not exist',
      elementSize: 'Sticky element is larger than its container, cannot create sticky.'
    },
    className: {
      bound: 'bound',
      fixed: 'fixed',
      supported: 'native',
      top: 'top',
      bottom: 'bottom'
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Tab
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.tab = function (parameters) {
    var // use window context if none specified
    $allModules = $.isFunction(this) ? $(window) : $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        initializedHistory = false,
        returnedValue;
    $allModules.each(function () {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.tab.settings, parameters) : $.extend({}, $.fn.tab.settings),
          className = settings.className,
          metadata = settings.metadata,
          selector = settings.selector,
          error = settings.error,
          eventNamespace = '.' + settings.namespace,
          moduleNamespace = 'module-' + settings.namespace,
          $module = $(this),
          $context,
          $tabs,
          cache = {},
          firstLoad = true,
          recursionDepth = 0,
          element = this,
          instance = $module.data(moduleNamespace),
          activeTabPath,
          parameterArray,
          module,
          historyEvent;
      module = {
        initialize: function initialize() {
          module.debug('Initializing tab menu item', $module);
          module.fix.callbacks();
          module.determineTabs();
          module.debug('Determining tabs', settings.context, $tabs); // set up automatic routing

          if (settings.auto) {
            module.set.auto();
          }

          module.bind.events();

          if (settings.history && !initializedHistory) {
            module.initializeHistory();
            initializedHistory = true;
          }

          module.instantiate();
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module.data(moduleNamespace, module);
        },
        destroy: function destroy() {
          module.debug('Destroying tabs', $module);
          $module.removeData(moduleNamespace).off(eventNamespace);
        },
        bind: {
          events: function events() {
            // if using $.tab don't add events
            if (!$.isWindow(element)) {
              module.debug('Attaching tab activation events to element', $module);
              $module.on('click' + eventNamespace, module.event.click);
            }
          }
        },
        determineTabs: function determineTabs() {
          var $reference; // determine tab context

          if (settings.context === 'parent') {
            if ($module.closest(selector.ui).length > 0) {
              $reference = $module.closest(selector.ui);
              module.verbose('Using closest UI element as parent', $reference);
            } else {
              $reference = $module;
            }

            $context = $reference.parent();
            module.verbose('Determined parent element for creating context', $context);
          } else if (settings.context) {
            $context = $(settings.context);
            module.verbose('Using selector for tab context', settings.context, $context);
          } else {
            $context = $('body');
          } // find tabs


          if (settings.childrenOnly) {
            $tabs = $context.children(selector.tabs);
            module.debug('Searching tab context children for tabs', $context, $tabs);
          } else {
            $tabs = $context.find(selector.tabs);
            module.debug('Searching tab context for tabs', $context, $tabs);
          }
        },
        fix: {
          callbacks: function callbacks() {
            if ($.isPlainObject(parameters) && (parameters.onTabLoad || parameters.onTabInit)) {
              if (parameters.onTabLoad) {
                parameters.onLoad = parameters.onTabLoad;
                delete parameters.onTabLoad;
                module.error(error.legacyLoad, parameters.onLoad);
              }

              if (parameters.onTabInit) {
                parameters.onFirstLoad = parameters.onTabInit;
                delete parameters.onTabInit;
                module.error(error.legacyInit, parameters.onFirstLoad);
              }

              settings = $.extend(true, {}, $.fn.tab.settings, parameters);
            }
          }
        },
        initializeHistory: function initializeHistory() {
          module.debug('Initializing page state');

          if ($.address === undefined) {
            module.error(error.state);
            return false;
          } else {
            if (settings.historyType == 'state') {
              module.debug('Using HTML5 to manage state');

              if (settings.path !== false) {
                $.address.history(true).state(settings.path);
              } else {
                module.error(error.path);
                return false;
              }
            }

            $.address.bind('change', module.event.history.change);
          }
        },
        event: {
          click: function click(event) {
            var tabPath = $(this).data(metadata.tab);

            if (tabPath !== undefined) {
              if (settings.history) {
                module.verbose('Updating page state', event);
                $.address.value(tabPath);
              } else {
                module.verbose('Changing tab', event);
                module.changeTab(tabPath);
              }

              event.preventDefault();
            } else {
              module.debug('No tab specified');
            }
          },
          history: {
            change: function change(event) {
              var tabPath = event.pathNames.join('/') || module.get.initialPath(),
                  pageTitle = settings.templates.determineTitle(tabPath) || false;
              module.performance.display();
              module.debug('History change event', tabPath, event);
              historyEvent = event;

              if (tabPath !== undefined) {
                module.changeTab(tabPath);
              }

              if (pageTitle) {
                $.address.title(pageTitle);
              }
            }
          }
        },
        refresh: function refresh() {
          if (activeTabPath) {
            module.debug('Refreshing tab', activeTabPath);
            module.changeTab(activeTabPath);
          }
        },
        cache: {
          read: function read(cacheKey) {
            return cacheKey !== undefined ? cache[cacheKey] : false;
          },
          add: function add(cacheKey, content) {
            cacheKey = cacheKey || activeTabPath;
            module.debug('Adding cached content for', cacheKey);
            cache[cacheKey] = content;
          },
          remove: function remove(cacheKey) {
            cacheKey = cacheKey || activeTabPath;
            module.debug('Removing cached content for', cacheKey);
            delete cache[cacheKey];
          }
        },
        set: {
          auto: function auto() {
            var url = typeof settings.path == 'string' ? settings.path.replace(/\/$/, '') + '/{$tab}' : '/{$tab}';
            module.verbose('Setting up automatic tab retrieval from server', url);

            if ($.isPlainObject(settings.apiSettings)) {
              settings.apiSettings.url = url;
            } else {
              settings.apiSettings = {
                url: url
              };
            }
          },
          loading: function loading(tabPath) {
            var $tab = module.get.tabElement(tabPath),
                isLoading = $tab.hasClass(className.loading);

            if (!isLoading) {
              module.verbose('Setting loading state for', $tab);
              $tab.addClass(className.loading).siblings($tabs).removeClass(className.active + ' ' + className.loading);

              if ($tab.length > 0) {
                settings.onRequest.call($tab[0], tabPath);
              }
            }
          },
          state: function state(_state) {
            $.address.value(_state);
          }
        },
        changeTab: function changeTab(tabPath) {
          var pushStateAvailable = window.history && window.history.pushState,
              shouldIgnoreLoad = pushStateAvailable && settings.ignoreFirstLoad && firstLoad,
              remoteContent = settings.auto || $.isPlainObject(settings.apiSettings),
              // only add default path if not remote content
          pathArray = remoteContent && !shouldIgnoreLoad ? module.utilities.pathToArray(tabPath) : module.get.defaultPathArray(tabPath);
          tabPath = module.utilities.arrayToPath(pathArray);
          $.each(pathArray, function (index, tab) {
            var currentPathArray = pathArray.slice(0, index + 1),
                currentPath = module.utilities.arrayToPath(currentPathArray),
                isTab = module.is.tab(currentPath),
                isLastIndex = index + 1 == pathArray.length,
                $tab = module.get.tabElement(currentPath),
                $anchor,
                nextPathArray,
                nextPath,
                isLastTab;
            module.verbose('Looking for tab', tab);

            if (isTab) {
              module.verbose('Tab was found', tab); // scope up

              activeTabPath = currentPath;
              parameterArray = module.utilities.filterArray(pathArray, currentPathArray);

              if (isLastIndex) {
                isLastTab = true;
              } else {
                nextPathArray = pathArray.slice(0, index + 2);
                nextPath = module.utilities.arrayToPath(nextPathArray);
                isLastTab = !module.is.tab(nextPath);

                if (isLastTab) {
                  module.verbose('Tab parameters found', nextPathArray);
                }
              }

              if (isLastTab && remoteContent) {
                if (!shouldIgnoreLoad) {
                  module.activate.navigation(currentPath);
                  module.fetch.content(currentPath, tabPath);
                } else {
                  module.debug('Ignoring remote content on first tab load', currentPath);
                  firstLoad = false;
                  module.cache.add(tabPath, $tab.html());
                  module.activate.all(currentPath);
                  settings.onFirstLoad.call($tab[0], currentPath, parameterArray, historyEvent);
                  settings.onLoad.call($tab[0], currentPath, parameterArray, historyEvent);
                }

                return false;
              } else {
                module.debug('Opened local tab', currentPath);
                module.activate.all(currentPath);

                if (!module.cache.read(currentPath)) {
                  module.cache.add(currentPath, true);
                  module.debug('First time tab loaded calling tab init');
                  settings.onFirstLoad.call($tab[0], currentPath, parameterArray, historyEvent);
                }

                settings.onLoad.call($tab[0], currentPath, parameterArray, historyEvent);
              }
            } else if (tabPath.search('/') == -1 && tabPath !== '') {
              // look for in page anchor
              $anchor = $('#' + tabPath + ', a[name="' + tabPath + '"]');
              currentPath = $anchor.closest('[data-tab]').data(metadata.tab);
              $tab = module.get.tabElement(currentPath); // if anchor exists use parent tab

              if ($anchor && $anchor.length > 0 && currentPath) {
                module.debug('Anchor link used, opening parent tab', $tab, $anchor);

                if (!$tab.hasClass(className.active)) {
                  setTimeout(function () {
                    module.scrollTo($anchor);
                  }, 0);
                }

                module.activate.all(currentPath);

                if (!module.cache.read(currentPath)) {
                  module.cache.add(currentPath, true);
                  module.debug('First time tab loaded calling tab init');
                  settings.onFirstLoad.call($tab[0], currentPath, parameterArray, historyEvent);
                }

                settings.onLoad.call($tab[0], currentPath, parameterArray, historyEvent);
                return false;
              }
            } else {
              module.error(error.missingTab, $module, $context, currentPath);
              return false;
            }
          });
        },
        scrollTo: function scrollTo($element) {
          var scrollOffset = $element && $element.length > 0 ? $element.offset().top : false;

          if (scrollOffset !== false) {
            module.debug('Forcing scroll to an in-page link in a hidden tab', scrollOffset, $element);
            $(document).scrollTop(scrollOffset);
          }
        },
        update: {
          content: function content(tabPath, html, evaluateScripts) {
            var $tab = module.get.tabElement(tabPath),
                tab = $tab[0];
            evaluateScripts = evaluateScripts !== undefined ? evaluateScripts : settings.evaluateScripts;

            if (typeof settings.cacheType == 'string' && settings.cacheType.toLowerCase() == 'dom' && typeof html !== 'string') {
              $tab.empty().append($(html).clone(true));
            } else {
              if (evaluateScripts) {
                module.debug('Updating HTML and evaluating inline scripts', tabPath, html);
                $tab.html(html);
              } else {
                module.debug('Updating HTML', tabPath, html);
                tab.innerHTML = html;
              }
            }
          }
        },
        fetch: {
          content: function content(tabPath, fullTabPath) {
            var $tab = module.get.tabElement(tabPath),
                apiSettings = {
              dataType: 'html',
              encodeParameters: false,
              on: 'now',
              cache: settings.alwaysRefresh,
              headers: {
                'X-Remote': true
              },
              onSuccess: function onSuccess(response) {
                if (settings.cacheType == 'response') {
                  module.cache.add(fullTabPath, response);
                }

                module.update.content(tabPath, response);

                if (tabPath == activeTabPath) {
                  module.debug('Content loaded', tabPath);
                  module.activate.tab(tabPath);
                } else {
                  module.debug('Content loaded in background', tabPath);
                }

                settings.onFirstLoad.call($tab[0], tabPath, parameterArray, historyEvent);
                settings.onLoad.call($tab[0], tabPath, parameterArray, historyEvent);

                if (settings.loadOnce) {
                  module.cache.add(fullTabPath, true);
                } else if (typeof settings.cacheType == 'string' && settings.cacheType.toLowerCase() == 'dom' && $tab.children().length > 0) {
                  setTimeout(function () {
                    var $clone = $tab.children().clone(true);
                    $clone = $clone.not('script');
                    module.cache.add(fullTabPath, $clone);
                  }, 0);
                } else {
                  module.cache.add(fullTabPath, $tab.html());
                }
              },
              urlData: {
                tab: fullTabPath
              }
            },
                request = $tab.api('get request') || false,
                existingRequest = request && request.state() === 'pending',
                requestSettings,
                cachedContent;
            fullTabPath = fullTabPath || tabPath;
            cachedContent = module.cache.read(fullTabPath);

            if (settings.cache && cachedContent) {
              module.activate.tab(tabPath);
              module.debug('Adding cached content', fullTabPath);

              if (!settings.loadOnce) {
                if (settings.evaluateScripts == 'once') {
                  module.update.content(tabPath, cachedContent, false);
                } else {
                  module.update.content(tabPath, cachedContent);
                }
              }

              settings.onLoad.call($tab[0], tabPath, parameterArray, historyEvent);
            } else if (existingRequest) {
              module.set.loading(tabPath);
              module.debug('Content is already loading', fullTabPath);
            } else if ($.api !== undefined) {
              requestSettings = $.extend(true, {}, settings.apiSettings, apiSettings);
              module.debug('Retrieving remote content', fullTabPath, requestSettings);
              module.set.loading(tabPath);
              $tab.api(requestSettings);
            } else {
              module.error(error.api);
            }
          }
        },
        activate: {
          all: function all(tabPath) {
            module.activate.tab(tabPath);
            module.activate.navigation(tabPath);
          },
          tab: function tab(tabPath) {
            var $tab = module.get.tabElement(tabPath),
                $deactiveTabs = settings.deactivate == 'siblings' ? $tab.siblings($tabs) : $tabs.not($tab),
                isActive = $tab.hasClass(className.active);
            module.verbose('Showing tab content for', $tab);

            if (!isActive) {
              $tab.addClass(className.active);
              $deactiveTabs.removeClass(className.active + ' ' + className.loading);

              if ($tab.length > 0) {
                settings.onVisible.call($tab[0], tabPath);
              }
            }
          },
          navigation: function navigation(tabPath) {
            var $navigation = module.get.navElement(tabPath),
                $deactiveNavigation = settings.deactivate == 'siblings' ? $navigation.siblings($allModules) : $allModules.not($navigation),
                isActive = $navigation.hasClass(className.active);
            module.verbose('Activating tab navigation for', $navigation, tabPath);

            if (!isActive) {
              $navigation.addClass(className.active);
              $deactiveNavigation.removeClass(className.active + ' ' + className.loading);
            }
          }
        },
        deactivate: {
          all: function all() {
            module.deactivate.navigation();
            module.deactivate.tabs();
          },
          navigation: function navigation() {
            $allModules.removeClass(className.active);
          },
          tabs: function tabs() {
            $tabs.removeClass(className.active + ' ' + className.loading);
          }
        },
        is: {
          tab: function tab(tabName) {
            return tabName !== undefined ? module.get.tabElement(tabName).length > 0 : false;
          }
        },
        get: {
          initialPath: function initialPath() {
            return $allModules.eq(0).data(metadata.tab) || $tabs.eq(0).data(metadata.tab);
          },
          path: function path() {
            return $.address.value();
          },
          // adds default tabs to tab path
          defaultPathArray: function defaultPathArray(tabPath) {
            return module.utilities.pathToArray(module.get.defaultPath(tabPath));
          },
          defaultPath: function defaultPath(tabPath) {
            var $defaultNav = $allModules.filter('[data-' + metadata.tab + '^="' + tabPath + '/"]').eq(0),
                defaultTab = $defaultNav.data(metadata.tab) || false;

            if (defaultTab) {
              module.debug('Found default tab', defaultTab);

              if (recursionDepth < settings.maxDepth) {
                recursionDepth++;
                return module.get.defaultPath(defaultTab);
              }

              module.error(error.recursion);
            } else {
              module.debug('No default tabs found for', tabPath, $tabs);
            }

            recursionDepth = 0;
            return tabPath;
          },
          navElement: function navElement(tabPath) {
            tabPath = tabPath || activeTabPath;
            return $allModules.filter('[data-' + metadata.tab + '="' + tabPath + '"]');
          },
          tabElement: function tabElement(tabPath) {
            var $fullPathTab, $simplePathTab, tabPathArray, lastTab;
            tabPath = tabPath || activeTabPath;
            tabPathArray = module.utilities.pathToArray(tabPath);
            lastTab = module.utilities.last(tabPathArray);
            $fullPathTab = $tabs.filter('[data-' + metadata.tab + '="' + tabPath + '"]');
            $simplePathTab = $tabs.filter('[data-' + metadata.tab + '="' + lastTab + '"]');
            return $fullPathTab.length > 0 ? $fullPathTab : $simplePathTab;
          },
          tab: function tab() {
            return activeTabPath;
          }
        },
        utilities: {
          filterArray: function filterArray(keepArray, removeArray) {
            return $.grep(keepArray, function (keepValue) {
              return $.inArray(keepValue, removeArray) == -1;
            });
          },
          last: function last(array) {
            return $.isArray(array) ? array[array.length - 1] : false;
          },
          pathToArray: function pathToArray(pathName) {
            if (pathName === undefined) {
              pathName = activeTabPath;
            }

            return typeof pathName == 'string' ? pathName.split('/') : [pathName];
          },
          arrayToPath: function arrayToPath(pathArray) {
            return $.isArray(pathArray) ? pathArray.join('/') : false;
          }
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                module.error(error.method, query);
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  }; // shortcut for tabbed content with no defined navigation


  $.tab = function () {
    $(window).tab.apply(this, arguments);
  };

  $.fn.tab.settings = {
    name: 'Tab',
    namespace: 'tab',
    silent: false,
    debug: false,
    verbose: false,
    performance: true,
    auto: false,
    // uses pjax style endpoints fetching content from same url with remote-content headers
    history: false,
    // use browser history
    historyType: 'hash',
    // #/ or html5 state
    path: false,
    // base path of url
    context: false,
    // specify a context that tabs must appear inside
    childrenOnly: false,
    // use only tabs that are children of context
    maxDepth: 25,
    // max depth a tab can be nested
    deactivate: 'siblings',
    // whether tabs should deactivate sibling menu elements or all elements initialized together
    alwaysRefresh: false,
    // load tab content new every tab click
    cache: true,
    // cache the content requests to pull locally
    loadOnce: false,
    // Whether tab data should only be loaded once when using remote content
    cacheType: 'response',
    // Whether to cache exact response, or to html cache contents after scripts execute
    ignoreFirstLoad: false,
    // don't load remote content on first load
    apiSettings: false,
    // settings for api call
    evaluateScripts: 'once',
    // whether inline scripts should be parsed (true/false/once). Once will not re-evaluate on cached content
    onFirstLoad: function onFirstLoad(tabPath, parameterArray, historyEvent) {},
    // called first time loaded
    onLoad: function onLoad(tabPath, parameterArray, historyEvent) {},
    // called on every load
    onVisible: function onVisible(tabPath, parameterArray, historyEvent) {},
    // called every time tab visible
    onRequest: function onRequest(tabPath, parameterArray, historyEvent) {},
    // called ever time a tab beings loading remote content
    templates: {
      determineTitle: function determineTitle(tabArray) {} // returns page title for path

    },
    error: {
      api: 'You attempted to load content without API module',
      method: 'The method you called is not defined',
      missingTab: 'Activated tab cannot be found. Tabs are case-sensitive.',
      noContent: 'The tab you specified is missing a content url.',
      path: 'History enabled, but no path was specified',
      recursion: 'Max recursive depth reached',
      legacyInit: 'onTabInit has been renamed to onFirstLoad in 2.0, please adjust your code.',
      legacyLoad: 'onTabLoad has been renamed to onLoad in 2.0. Please adjust your code',
      state: 'History requires Asual\'s Address library <https://github.com/asual/jquery-address>'
    },
    metadata: {
      tab: 'tab',
      loaded: 'loaded',
      promise: 'promise'
    },
    className: {
      loading: 'loading',
      active: 'active'
    },
    selector: {
      tabs: '.ui.tab',
      ui: '.ui'
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Transition
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.transition = function () {
    var $allModules = $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        moduleArguments = arguments,
        query = moduleArguments[0],
        queryArguments = [].slice.call(arguments, 1),
        methodInvoked = typeof query === 'string',
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      setTimeout(callback, 0);
    },
        returnedValue;

    $allModules.each(function (index) {
      var $module = $(this),
          element = this,
          // set at run time
      settings,
          instance,
          error,
          className,
          metadata,
          animationEnd,
          animationName,
          namespace,
          moduleNamespace,
          eventNamespace,
          module;
      module = {
        initialize: function initialize() {
          // get full settings
          settings = module.get.settings.apply(element, moduleArguments); // shorthand

          className = settings.className;
          error = settings.error;
          metadata = settings.metadata; // define namespace

          eventNamespace = '.' + settings.namespace;
          moduleNamespace = 'module-' + settings.namespace;
          instance = $module.data(moduleNamespace) || module; // get vendor specific events

          animationEnd = module.get.animationEndEvent();

          if (methodInvoked) {
            methodInvoked = module.invoke(query);
          } // method not invoked, lets run an animation


          if (methodInvoked === false) {
            module.verbose('Converted arguments into settings object', settings);

            if (settings.interval) {
              module.delay(settings.animate);
            } else {
              module.animate();
            }

            module.instantiate();
          }
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module.data(moduleNamespace, instance);
        },
        destroy: function destroy() {
          module.verbose('Destroying previous module for', element);
          $module.removeData(moduleNamespace);
        },
        refresh: function refresh() {
          module.verbose('Refreshing display type on next animation');
          delete module.displayType;
        },
        forceRepaint: function forceRepaint() {
          module.verbose('Forcing element repaint');
          var $parentElement = $module.parent(),
              $nextElement = $module.next();

          if ($nextElement.length === 0) {
            $module.detach().appendTo($parentElement);
          } else {
            $module.detach().insertBefore($nextElement);
          }
        },
        repaint: function repaint() {
          module.verbose('Repainting element');
          var fakeAssignment = element.offsetWidth;
        },
        delay: function delay(interval) {
          var direction = module.get.animationDirection(),
              shouldReverse,
              delay;

          if (!direction) {
            direction = module.can.transition() ? module.get.direction() : 'static';
          }

          interval = interval !== undefined ? interval : settings.interval;
          shouldReverse = settings.reverse == 'auto' && direction == className.outward;
          delay = shouldReverse || settings.reverse == true ? ($allModules.length - index) * settings.interval : index * settings.interval;
          module.debug('Delaying animation by', delay);
          setTimeout(module.animate, delay);
        },
        animate: function animate(overrideSettings) {
          settings = overrideSettings || settings;

          if (!module.is.supported()) {
            module.error(error.support);
            return false;
          }

          module.debug('Preparing animation', settings.animation);

          if (module.is.animating()) {
            if (settings.queue) {
              if (!settings.allowRepeats && module.has.direction() && module.is.occurring() && module.queuing !== true) {
                module.debug('Animation is currently occurring, preventing queueing same animation', settings.animation);
              } else {
                module.queue(settings.animation);
              }

              return false;
            } else if (!settings.allowRepeats && module.is.occurring()) {
              module.debug('Animation is already occurring, will not execute repeated animation', settings.animation);
              return false;
            } else {
              module.debug('New animation started, completing previous early', settings.animation);
              instance.complete();
            }
          }

          if (module.can.animate()) {
            module.set.animating(settings.animation);
          } else {
            module.error(error.noAnimation, settings.animation, element);
          }
        },
        reset: function reset() {
          module.debug('Resetting animation to beginning conditions');
          module.remove.animationCallbacks();
          module.restore.conditions();
          module.remove.animating();
        },
        queue: function queue(animation) {
          module.debug('Queueing animation of', animation);
          module.queuing = true;
          $module.one(animationEnd + '.queue' + eventNamespace, function () {
            module.queuing = false;
            module.repaint();
            module.animate.apply(this, settings);
          });
        },
        complete: function complete(event) {
          module.debug('Animation complete', settings.animation);
          module.remove.completeCallback();
          module.remove.failSafe();

          if (!module.is.looping()) {
            if (module.is.outward()) {
              module.verbose('Animation is outward, hiding element');
              module.restore.conditions();
              module.hide();
            } else if (module.is.inward()) {
              module.verbose('Animation is outward, showing element');
              module.restore.conditions();
              module.show();
            } else {
              module.verbose('Static animation completed');
              module.restore.conditions();
              settings.onComplete.call(element);
            }
          }
        },
        force: {
          visible: function visible() {
            var style = $module.attr('style'),
                userStyle = module.get.userStyle(),
                displayType = module.get.displayType(),
                overrideStyle = userStyle + 'display: ' + displayType + ' !important;',
                currentDisplay = $module.css('display'),
                emptyStyle = style === undefined || style === '';

            if (currentDisplay !== displayType) {
              module.verbose('Overriding default display to show element', displayType);
              $module.attr('style', overrideStyle);
            } else if (emptyStyle) {
              $module.removeAttr('style');
            }
          },
          hidden: function hidden() {
            var style = $module.attr('style'),
                currentDisplay = $module.css('display'),
                emptyStyle = style === undefined || style === '';

            if (currentDisplay !== 'none' && !module.is.hidden()) {
              module.verbose('Overriding default display to hide element');
              $module.css('display', 'none');
            } else if (emptyStyle) {
              $module.removeAttr('style');
            }
          }
        },
        has: {
          direction: function direction(animation) {
            var hasDirection = false;
            animation = animation || settings.animation;

            if (typeof animation === 'string') {
              animation = animation.split(' ');
              $.each(animation, function (index, word) {
                if (word === className.inward || word === className.outward) {
                  hasDirection = true;
                }
              });
            }

            return hasDirection;
          },
          inlineDisplay: function inlineDisplay() {
            var style = $module.attr('style') || '';
            return $.isArray(style.match(/display.*?;/, ''));
          }
        },
        set: {
          animating: function animating(animation) {
            var animationClass, direction; // remove previous callbacks

            module.remove.completeCallback(); // determine exact animation

            animation = animation || settings.animation;
            animationClass = module.get.animationClass(animation); // save animation class in cache to restore class names

            module.save.animation(animationClass); // override display if necessary so animation appears visibly

            module.force.visible();
            module.remove.hidden();
            module.remove.direction();
            module.start.animation(animationClass);
          },
          duration: function duration(animationName, _duration3) {
            _duration3 = _duration3 || settings.duration;
            _duration3 = typeof _duration3 == 'number' ? _duration3 + 'ms' : _duration3;

            if (_duration3 || _duration3 === 0) {
              module.verbose('Setting animation duration', _duration3);
              $module.css({
                'animation-duration': _duration3
              });
            }
          },
          direction: function direction(_direction3) {
            _direction3 = _direction3 || module.get.direction();

            if (_direction3 == className.inward) {
              module.set.inward();
            } else {
              module.set.outward();
            }
          },
          looping: function looping() {
            module.debug('Transition set to loop');
            $module.addClass(className.looping);
          },
          hidden: function hidden() {
            $module.addClass(className.transition).addClass(className.hidden);
          },
          inward: function inward() {
            module.debug('Setting direction to inward');
            $module.removeClass(className.outward).addClass(className.inward);
          },
          outward: function outward() {
            module.debug('Setting direction to outward');
            $module.removeClass(className.inward).addClass(className.outward);
          },
          visible: function visible() {
            $module.addClass(className.transition).addClass(className.visible);
          }
        },
        start: {
          animation: function animation(animationClass) {
            animationClass = animationClass || module.get.animationClass();
            module.debug('Starting tween', animationClass);
            $module.addClass(animationClass).one(animationEnd + '.complete' + eventNamespace, module.complete);

            if (settings.useFailSafe) {
              module.add.failSafe();
            }

            module.set.duration(settings.duration);
            settings.onStart.call(element);
          }
        },
        save: {
          animation: function animation(_animation) {
            if (!module.cache) {
              module.cache = {};
            }

            module.cache.animation = _animation;
          },
          displayType: function displayType(_displayType) {
            if (_displayType !== 'none') {
              $module.data(metadata.displayType, _displayType);
            }
          },
          transitionExists: function transitionExists(animation, exists) {
            $.fn.transition.exists[animation] = exists;
            module.verbose('Saving existence of transition', animation, exists);
          }
        },
        restore: {
          conditions: function conditions() {
            var animation = module.get.currentAnimation();

            if (animation) {
              $module.removeClass(animation);
              module.verbose('Removing animation class', module.cache);
            }

            module.remove.duration();
          }
        },
        add: {
          failSafe: function failSafe() {
            var duration = module.get.duration();
            module.timer = setTimeout(function () {
              $module.triggerHandler(animationEnd);
            }, duration + settings.failSafeDelay);
            module.verbose('Adding fail safe timer', module.timer);
          }
        },
        remove: {
          animating: function animating() {
            $module.removeClass(className.animating);
          },
          animationCallbacks: function animationCallbacks() {
            module.remove.queueCallback();
            module.remove.completeCallback();
          },
          queueCallback: function queueCallback() {
            $module.off('.queue' + eventNamespace);
          },
          completeCallback: function completeCallback() {
            $module.off('.complete' + eventNamespace);
          },
          display: function display() {
            $module.css('display', '');
          },
          direction: function direction() {
            $module.removeClass(className.inward).removeClass(className.outward);
          },
          duration: function duration() {
            $module.css('animation-duration', '');
          },
          failSafe: function failSafe() {
            module.verbose('Removing fail safe timer', module.timer);

            if (module.timer) {
              clearTimeout(module.timer);
            }
          },
          hidden: function hidden() {
            $module.removeClass(className.hidden);
          },
          visible: function visible() {
            $module.removeClass(className.visible);
          },
          looping: function looping() {
            module.debug('Transitions are no longer looping');

            if (module.is.looping()) {
              module.reset();
              $module.removeClass(className.looping);
            }
          },
          transition: function transition() {
            $module.removeClass(className.visible).removeClass(className.hidden);
          }
        },
        get: {
          settings: function settings(animation, duration, onComplete) {
            // single settings object
            if (_typeof(animation) == 'object') {
              return $.extend(true, {}, $.fn.transition.settings, animation);
            } // all arguments provided
            else if (typeof onComplete == 'function') {
                return $.extend({}, $.fn.transition.settings, {
                  animation: animation,
                  onComplete: onComplete,
                  duration: duration
                });
              } // only duration provided
              else if (typeof duration == 'string' || typeof duration == 'number') {
                  return $.extend({}, $.fn.transition.settings, {
                    animation: animation,
                    duration: duration
                  });
                } // duration is actually settings object
                else if (_typeof(duration) == 'object') {
                    return $.extend({}, $.fn.transition.settings, duration, {
                      animation: animation
                    });
                  } // duration is actually callback
                  else if (typeof duration == 'function') {
                      return $.extend({}, $.fn.transition.settings, {
                        animation: animation,
                        onComplete: duration
                      });
                    } // only animation provided
                    else {
                        return $.extend({}, $.fn.transition.settings, {
                          animation: animation
                        });
                      }
          },
          animationClass: function animationClass(animation) {
            var animationClass = animation || settings.animation,
                directionClass = module.can.transition() && !module.has.direction() ? module.get.direction() + ' ' : '';
            return className.animating + ' ' + className.transition + ' ' + directionClass + animationClass;
          },
          currentAnimation: function currentAnimation() {
            return module.cache && module.cache.animation !== undefined ? module.cache.animation : false;
          },
          currentDirection: function currentDirection() {
            return module.is.inward() ? className.inward : className.outward;
          },
          direction: function direction() {
            return module.is.hidden() || !module.is.visible() ? className.inward : className.outward;
          },
          animationDirection: function animationDirection(animation) {
            var direction;
            animation = animation || settings.animation;

            if (typeof animation === 'string') {
              animation = animation.split(' '); // search animation name for out/in class

              $.each(animation, function (index, word) {
                if (word === className.inward) {
                  direction = className.inward;
                } else if (word === className.outward) {
                  direction = className.outward;
                }
              });
            } // return found direction


            if (direction) {
              return direction;
            }

            return false;
          },
          duration: function duration(_duration4) {
            _duration4 = _duration4 || settings.duration;

            if (_duration4 === false) {
              _duration4 = $module.css('animation-duration') || 0;
            }

            return typeof _duration4 === 'string' ? _duration4.indexOf('ms') > -1 ? parseFloat(_duration4) : parseFloat(_duration4) * 1000 : _duration4;
          },
          displayType: function displayType(shouldDetermine) {
            shouldDetermine = shouldDetermine !== undefined ? shouldDetermine : true;

            if (settings.displayType) {
              return settings.displayType;
            }

            if (shouldDetermine && $module.data(metadata.displayType) === undefined) {
              // create fake element to determine display state
              module.can.transition(true);
            }

            return $module.data(metadata.displayType);
          },
          userStyle: function userStyle(style) {
            style = style || $module.attr('style') || '';
            return style.replace(/display.*?;/, '');
          },
          transitionExists: function transitionExists(animation) {
            return $.fn.transition.exists[animation];
          },
          animationStartEvent: function animationStartEvent() {
            var element = document.createElement('div'),
                animations = {
              'animation': 'animationstart',
              'OAnimation': 'oAnimationStart',
              'MozAnimation': 'mozAnimationStart',
              'WebkitAnimation': 'webkitAnimationStart'
            },
                animation;

            for (animation in animations) {
              if (element.style[animation] !== undefined) {
                return animations[animation];
              }
            }

            return false;
          },
          animationEndEvent: function animationEndEvent() {
            var element = document.createElement('div'),
                animations = {
              'animation': 'animationend',
              'OAnimation': 'oAnimationEnd',
              'MozAnimation': 'mozAnimationEnd',
              'WebkitAnimation': 'webkitAnimationEnd'
            },
                animation;

            for (animation in animations) {
              if (element.style[animation] !== undefined) {
                return animations[animation];
              }
            }

            return false;
          }
        },
        can: {
          transition: function transition(forced) {
            var animation = settings.animation,
                transitionExists = module.get.transitionExists(animation),
                displayType = module.get.displayType(false),
                elementClass,
                tagName,
                $clone,
                currentAnimation,
                inAnimation,
                directionExists;

            if (transitionExists === undefined || forced) {
              module.verbose('Determining whether animation exists');
              elementClass = $module.attr('class');
              tagName = $module.prop('tagName');
              $clone = $('<' + tagName + ' />').addClass(elementClass).insertAfter($module);
              currentAnimation = $clone.addClass(animation).removeClass(className.inward).removeClass(className.outward).addClass(className.animating).addClass(className.transition).css('animationName');
              inAnimation = $clone.addClass(className.inward).css('animationName');

              if (!displayType) {
                displayType = $clone.attr('class', elementClass).removeAttr('style').removeClass(className.hidden).removeClass(className.visible).show().css('display');
                module.verbose('Determining final display state', displayType);
                module.save.displayType(displayType);
              }

              $clone.remove();

              if (currentAnimation != inAnimation) {
                module.debug('Direction exists for animation', animation);
                directionExists = true;
              } else if (currentAnimation == 'none' || !currentAnimation) {
                module.debug('No animation defined in css', animation);
                return;
              } else {
                module.debug('Static animation found', animation, displayType);
                directionExists = false;
              }

              module.save.transitionExists(animation, directionExists);
            }

            return transitionExists !== undefined ? transitionExists : directionExists;
          },
          animate: function animate() {
            // can transition does not return a value if animation does not exist
            return module.can.transition() !== undefined;
          }
        },
        is: {
          animating: function animating() {
            return $module.hasClass(className.animating);
          },
          inward: function inward() {
            return $module.hasClass(className.inward);
          },
          outward: function outward() {
            return $module.hasClass(className.outward);
          },
          looping: function looping() {
            return $module.hasClass(className.looping);
          },
          occurring: function occurring(animation) {
            animation = animation || settings.animation;
            animation = '.' + animation.replace(' ', '.');
            return $module.filter(animation).length > 0;
          },
          visible: function visible() {
            return $module.is(':visible');
          },
          hidden: function hidden() {
            return $module.css('visibility') === 'hidden';
          },
          supported: function supported() {
            return animationEnd !== false;
          }
        },
        hide: function hide() {
          module.verbose('Hiding element');

          if (module.is.animating()) {
            module.reset();
          }

          element.blur(); // IE will trigger focus change if element is not blurred before hiding

          module.remove.display();
          module.remove.visible();
          module.set.hidden();
          module.force.hidden();
          settings.onHide.call(element);
          settings.onComplete.call(element); // module.repaint();
        },
        show: function show(display) {
          module.verbose('Showing element', display);
          module.remove.hidden();
          module.set.visible();
          module.force.visible();
          settings.onShow.call(element);
          settings.onComplete.call(element); // module.repaint();
        },
        toggle: function toggle() {
          if (module.is.visible()) {
            module.hide();
          } else {
            module.show();
          }
        },
        stop: function stop() {
          module.debug('Stopping current animation');
          $module.triggerHandler(animationEnd);
        },
        stopAll: function stopAll() {
          module.debug('Stopping all animation');
          module.remove.queueCallback();
          $module.triggerHandler(animationEnd);
        },
        clear: {
          queue: function queue() {
            module.debug('Clearing animation queue');
            module.remove.queueCallback();
          }
        },
        enable: function enable() {
          module.verbose('Starting animation');
          $module.removeClass(className.disabled);
        },
        disable: function disable() {
          module.debug('Stopping animation');
          $module.addClass(className.disabled);
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(settings[name])) {
              $.extend(true, settings[name], value);
            } else {
              settings[name] = value;
            }
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ($allModules.length > 1) {
              title += ' ' + '(' + $allModules.length + ')';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        // modified for transition to return invoke success
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found !== undefined ? found : false;
        }
      };
      module.initialize();
    });
    return returnedValue !== undefined ? returnedValue : this;
  }; // Records if CSS transition is available


  $.fn.transition.exists = {};
  $.fn.transition.settings = {
    // module info
    name: 'Transition',
    // hide all output from this component regardless of other settings
    silent: false,
    // debug content outputted to console
    debug: false,
    // verbose debug output
    verbose: false,
    // performance data output
    performance: true,
    // event namespace
    namespace: 'transition',
    // delay between animations in group
    interval: 0,
    // whether group animations should be reversed
    reverse: 'auto',
    // animation callback event
    onStart: function onStart() {},
    onComplete: function onComplete() {},
    onShow: function onShow() {},
    onHide: function onHide() {},
    // whether timeout should be used to ensure callback fires in cases animationend does not
    useFailSafe: true,
    // delay in ms for fail safe
    failSafeDelay: 100,
    // whether EXACT animation can occur twice in a row
    allowRepeats: false,
    // Override final display type on visible
    displayType: false,
    // animation duration
    animation: 'fade',
    duration: false,
    // new animations will occur after previous ones
    queue: true,
    metadata: {
      displayType: 'display'
    },
    className: {
      animating: 'animating',
      disabled: 'disabled',
      hidden: 'hidden',
      inward: 'in',
      loading: 'loading',
      looping: 'looping',
      outward: 'out',
      transition: 'transition',
      visible: 'visible'
    },
    // possible errors
    error: {
      noAnimation: 'Element is no longer attached to DOM. Unable to animate.  Use silent setting to surpress this warning in production.',
      repeated: 'That animation is already occurring, cancelling repeated animation',
      method: 'The method you called is not defined',
      support: 'This browser does not support CSS animations'
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - API
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  var window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.api = $.fn.api = function (parameters) {
    var // use window context if none specified
    $allModules = $.isFunction(this) ? $(window) : $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue;
    $allModules.each(function () {
      var _settings5 = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.api.settings, parameters) : $.extend({}, $.fn.api.settings),
          // internal aliases
      namespace = _settings5.namespace,
          metadata = _settings5.metadata,
          selector = _settings5.selector,
          error = _settings5.error,
          className = _settings5.className,
          // define namespaces for modules
      eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          // element that creates request
      $module = $(this),
          $form = $module.closest(selector.form),
          // context used for state
      $context = _settings5.stateContext ? $(_settings5.stateContext) : $module,
          // request details
      ajaxSettings,
          requestSettings,
          url,
          data,
          requestStartTime,
          // standard module
      element = this,
          context = $context[0],
          instance = $module.data(moduleNamespace),
          module;

      module = {
        initialize: function initialize() {
          if (!methodInvoked) {
            module.bind.events();
          }

          module.instantiate();
        },
        instantiate: function instantiate() {
          module.verbose('Storing instance of module', module);
          instance = module;
          $module.data(moduleNamespace, instance);
        },
        destroy: function destroy() {
          module.verbose('Destroying previous module for', element);
          $module.removeData(moduleNamespace).off(eventNamespace);
        },
        bind: {
          events: function events() {
            var triggerEvent = module.get.event();

            if (triggerEvent) {
              module.verbose('Attaching API events to element', triggerEvent);
              $module.on(triggerEvent + eventNamespace, module.event.trigger);
            } else if (_settings5.on == 'now') {
              module.debug('Querying API endpoint immediately');
              module.query();
            }
          }
        },
        decode: {
          json: function json(response) {
            if (response !== undefined && typeof response == 'string') {
              try {
                response = JSON.parse(response);
              } catch (e) {// isnt json string
              }
            }

            return response;
          }
        },
        read: {
          cachedResponse: function cachedResponse(url) {
            var response;

            if (window.Storage === undefined) {
              module.error(error.noStorage);
              return;
            }

            response = sessionStorage.getItem(url);
            module.debug('Using cached response', url, response);
            response = module.decode.json(response);
            return response;
          }
        },
        write: {
          cachedResponse: function cachedResponse(url, response) {
            if (response && response === '') {
              module.debug('Response empty, not caching', response);
              return;
            }

            if (window.Storage === undefined) {
              module.error(error.noStorage);
              return;
            }

            if ($.isPlainObject(response)) {
              response = JSON.stringify(response);
            }

            sessionStorage.setItem(url, response);
            module.verbose('Storing cached response for url', url, response);
          }
        },
        query: function query() {
          if (module.is.disabled()) {
            module.debug('Element is disabled API request aborted');
            return;
          }

          if (module.is.loading()) {
            if (_settings5.interruptRequests) {
              module.debug('Interrupting previous request');
              module.abort();
            } else {
              module.debug('Cancelling request, previous request is still pending');
              return;
            }
          } // pass element metadata to url (value, text)


          if (_settings5.defaultData) {
            $.extend(true, _settings5.urlData, module.get.defaultData());
          } // Add form content


          if (_settings5.serializeForm) {
            _settings5.data = module.add.formData(_settings5.data);
          } // call beforesend and get any settings changes


          requestSettings = module.get.settings(); // check if before send cancelled request

          if (requestSettings === false) {
            module.cancelled = true;
            module.error(error.beforeSend);
            return;
          } else {
            module.cancelled = false;
          } // get url


          url = module.get.templatedURL();

          if (!url && !module.is.mocked()) {
            module.error(error.missingURL);
            return;
          } // replace variables


          url = module.add.urlData(url); // missing url parameters

          if (!url && !module.is.mocked()) {
            return;
          }

          requestSettings.url = _settings5.base + url; // look for jQuery ajax parameters in settings

          ajaxSettings = $.extend(true, {}, _settings5, {
            type: _settings5.method || _settings5.type,
            data: data,
            url: _settings5.base + url,
            beforeSend: _settings5.beforeXHR,
            success: function success() {},
            failure: function failure() {},
            complete: function complete() {}
          });
          module.debug('Querying URL', ajaxSettings.url);
          module.verbose('Using AJAX settings', ajaxSettings);

          if (_settings5.cache === 'local' && module.read.cachedResponse(url)) {
            module.debug('Response returned from local cache');
            module.request = module.create.request();
            module.request.resolveWith(context, [module.read.cachedResponse(url)]);
            return;
          }

          if (!_settings5.throttle) {
            module.debug('Sending request', data, ajaxSettings.method);
            module.send.request();
          } else {
            if (!_settings5.throttleFirstRequest && !module.timer) {
              module.debug('Sending request', data, ajaxSettings.method);
              module.send.request();
              module.timer = setTimeout(function () {}, _settings5.throttle);
            } else {
              module.debug('Throttling request', _settings5.throttle);
              clearTimeout(module.timer);
              module.timer = setTimeout(function () {
                if (module.timer) {
                  delete module.timer;
                }

                module.debug('Sending throttled request', data, ajaxSettings.method);
                module.send.request();
              }, _settings5.throttle);
            }
          }
        },
        should: {
          removeError: function removeError() {
            return _settings5.hideError === true || _settings5.hideError === 'auto' && !module.is.form();
          }
        },
        is: {
          disabled: function disabled() {
            return $module.filter(selector.disabled).length > 0;
          },
          expectingJSON: function expectingJSON() {
            return _settings5.dataType === 'json' || _settings5.dataType === 'jsonp';
          },
          form: function form() {
            return $module.is('form') || $context.is('form');
          },
          mocked: function mocked() {
            return _settings5.mockResponse || _settings5.mockResponseAsync || _settings5.response || _settings5.responseAsync;
          },
          input: function input() {
            return $module.is('input');
          },
          loading: function loading() {
            return module.request ? module.request.state() == 'pending' : false;
          },
          abortedRequest: function abortedRequest(xhr) {
            if (xhr && xhr.readyState !== undefined && xhr.readyState === 0) {
              module.verbose('XHR request determined to be aborted');
              return true;
            } else {
              module.verbose('XHR request was not aborted');
              return false;
            }
          },
          validResponse: function validResponse(response) {
            if (!module.is.expectingJSON() || !$.isFunction(_settings5.successTest)) {
              module.verbose('Response is not JSON, skipping validation', _settings5.successTest, response);
              return true;
            }

            module.debug('Checking JSON returned success', _settings5.successTest, response);

            if (_settings5.successTest(response)) {
              module.debug('Response passed success test', response);
              return true;
            } else {
              module.debug('Response failed success test', response);
              return false;
            }
          }
        },
        was: {
          cancelled: function cancelled() {
            return module.cancelled || false;
          },
          succesful: function succesful() {
            return module.request && module.request.state() == 'resolved';
          },
          failure: function failure() {
            return module.request && module.request.state() == 'rejected';
          },
          complete: function complete() {
            return module.request && (module.request.state() == 'resolved' || module.request.state() == 'rejected');
          }
        },
        add: {
          urlData: function urlData(url, _urlData) {
            var requiredVariables, optionalVariables;

            if (url) {
              requiredVariables = url.match(_settings5.regExp.required);
              optionalVariables = url.match(_settings5.regExp.optional);
              _urlData = _urlData || _settings5.urlData;

              if (requiredVariables) {
                module.debug('Looking for required URL variables', requiredVariables);
                $.each(requiredVariables, function (index, templatedString) {
                  var // allow legacy {$var} style
                  variable = templatedString.indexOf('$') !== -1 ? templatedString.substr(2, templatedString.length - 3) : templatedString.substr(1, templatedString.length - 2),
                      value = $.isPlainObject(_urlData) && _urlData[variable] !== undefined ? _urlData[variable] : $module.data(variable) !== undefined ? $module.data(variable) : $context.data(variable) !== undefined ? $context.data(variable) : _urlData[variable]; // remove value

                  if (value === undefined) {
                    module.error(error.requiredParameter, variable, url);
                    url = false;
                    return false;
                  } else {
                    module.verbose('Found required variable', variable, value);
                    value = _settings5.encodeParameters ? module.get.urlEncodedValue(value) : value;
                    url = url.replace(templatedString, value);
                  }
                });
              }

              if (optionalVariables) {
                module.debug('Looking for optional URL variables', requiredVariables);
                $.each(optionalVariables, function (index, templatedString) {
                  var // allow legacy {/$var} style
                  variable = templatedString.indexOf('$') !== -1 ? templatedString.substr(3, templatedString.length - 4) : templatedString.substr(2, templatedString.length - 3),
                      value = $.isPlainObject(_urlData) && _urlData[variable] !== undefined ? _urlData[variable] : $module.data(variable) !== undefined ? $module.data(variable) : $context.data(variable) !== undefined ? $context.data(variable) : _urlData[variable]; // optional replacement

                  if (value !== undefined) {
                    module.verbose('Optional variable Found', variable, value);
                    url = url.replace(templatedString, value);
                  } else {
                    module.verbose('Optional variable not found', variable); // remove preceding slash if set

                    if (url.indexOf('/' + templatedString) !== -1) {
                      url = url.replace('/' + templatedString, '');
                    } else {
                      url = url.replace(templatedString, '');
                    }
                  }
                });
              }
            }

            return url;
          },
          formData: function formData(data) {
            var canSerialize = $.fn.serializeObject !== undefined,
                formData = canSerialize ? $form.serializeObject() : $form.serialize(),
                hasOtherData;
            data = data || _settings5.data;
            hasOtherData = $.isPlainObject(data);

            if (hasOtherData) {
              if (canSerialize) {
                module.debug('Extending existing data with form data', data, formData);
                data = $.extend(true, {}, data, formData);
              } else {
                module.error(error.missingSerialize);
                module.debug('Cant extend data. Replacing data with form data', data, formData);
                data = formData;
              }
            } else {
              module.debug('Adding form data', formData);
              data = formData;
            }

            return data;
          }
        },
        send: {
          request: function request() {
            module.set.loading();
            module.request = module.create.request();

            if (module.is.mocked()) {
              module.mockedXHR = module.create.mockedXHR();
            } else {
              module.xhr = module.create.xhr();
            }

            _settings5.onRequest.call(context, module.request, module.xhr);
          }
        },
        event: {
          trigger: function trigger(event) {
            module.query();

            if (event.type == 'submit' || event.type == 'click') {
              event.preventDefault();
            }
          },
          xhr: {
            always: function always() {// nothing special
            },
            done: function done(response, textStatus, xhr) {
              var context = this,
                  elapsedTime = new Date().getTime() - requestStartTime,
                  timeLeft = _settings5.loadingDuration - elapsedTime,
                  translatedResponse = $.isFunction(_settings5.onResponse) ? module.is.expectingJSON() ? _settings5.onResponse.call(context, $.extend(true, {}, response)) : _settings5.onResponse.call(context, response) : false;
              timeLeft = timeLeft > 0 ? timeLeft : 0;

              if (translatedResponse) {
                module.debug('Modified API response in onResponse callback', _settings5.onResponse, translatedResponse, response);
                response = translatedResponse;
              }

              if (timeLeft > 0) {
                module.debug('Response completed early delaying state change by', timeLeft);
              }

              setTimeout(function () {
                if (module.is.validResponse(response)) {
                  module.request.resolveWith(context, [response, xhr]);
                } else {
                  module.request.rejectWith(context, [xhr, 'invalid']);
                }
              }, timeLeft);
            },
            fail: function fail(xhr, status, httpMessage) {
              var context = this,
                  elapsedTime = new Date().getTime() - requestStartTime,
                  timeLeft = _settings5.loadingDuration - elapsedTime;
              timeLeft = timeLeft > 0 ? timeLeft : 0;

              if (timeLeft > 0) {
                module.debug('Response completed early delaying state change by', timeLeft);
              }

              setTimeout(function () {
                if (module.is.abortedRequest(xhr)) {
                  module.request.rejectWith(context, [xhr, 'aborted', httpMessage]);
                } else {
                  module.request.rejectWith(context, [xhr, 'error', status, httpMessage]);
                }
              }, timeLeft);
            }
          },
          request: {
            done: function done(response, xhr) {
              module.debug('Successful API Response', response);

              if (_settings5.cache === 'local' && url) {
                module.write.cachedResponse(url, response);
                module.debug('Saving server response locally', module.cache);
              }

              _settings5.onSuccess.call(context, response, $module, xhr);
            },
            complete: function complete(firstParameter, secondParameter) {
              var xhr, response; // have to guess callback parameters based on request success

              if (module.was.succesful()) {
                response = firstParameter;
                xhr = secondParameter;
              } else {
                xhr = firstParameter;
                response = module.get.responseFromXHR(xhr);
              }

              module.remove.loading();

              _settings5.onComplete.call(context, response, $module, xhr);
            },
            fail: function fail(xhr, status, httpMessage) {
              var // pull response from xhr if available
              response = module.get.responseFromXHR(xhr),
                  errorMessage = module.get.errorFromRequest(response, status, httpMessage);

              if (status == 'aborted') {
                module.debug('XHR Aborted (Most likely caused by page navigation or CORS Policy)', status, httpMessage);

                _settings5.onAbort.call(context, status, $module, xhr);

                return true;
              } else if (status == 'invalid') {
                module.debug('JSON did not pass success test. A server-side error has most likely occurred', response);
              } else if (status == 'error') {
                if (xhr !== undefined) {
                  module.debug('XHR produced a server error', status, httpMessage); // make sure we have an error to display to console

                  if (xhr.status != 200 && httpMessage !== undefined && httpMessage !== '') {
                    module.error(error.statusMessage + httpMessage, ajaxSettings.url);
                  }

                  _settings5.onError.call(context, errorMessage, $module, xhr);
                }
              }

              if (_settings5.errorDuration && status !== 'aborted') {
                module.debug('Adding error state');
                module.set.error();

                if (module.should.removeError()) {
                  setTimeout(module.remove.error, _settings5.errorDuration);
                }
              }

              module.debug('API Request failed', errorMessage, xhr);

              _settings5.onFailure.call(context, response, $module, xhr);
            }
          }
        },
        create: {
          request: function request() {
            // api request promise
            return $.Deferred().always(module.event.request.complete).done(module.event.request.done).fail(module.event.request.fail);
          },
          mockedXHR: function mockedXHR() {
            var // xhr does not simulate these properties of xhr but must return them
            textStatus = false,
                status = false,
                httpMessage = false,
                responder = _settings5.mockResponse || _settings5.response,
                asyncResponder = _settings5.mockResponseAsync || _settings5.responseAsync,
                asyncCallback,
                response,
                mockedXHR;
            mockedXHR = $.Deferred().always(module.event.xhr.complete).done(module.event.xhr.done).fail(module.event.xhr.fail);

            if (responder) {
              if ($.isFunction(responder)) {
                module.debug('Using specified synchronous callback', responder);
                response = responder.call(context, requestSettings);
              } else {
                module.debug('Using settings specified response', responder);
                response = responder;
              } // simulating response


              mockedXHR.resolveWith(context, [response, textStatus, {
                responseText: response
              }]);
            } else if ($.isFunction(asyncResponder)) {
              asyncCallback = function asyncCallback(response) {
                module.debug('Async callback returned response', response);

                if (response) {
                  mockedXHR.resolveWith(context, [response, textStatus, {
                    responseText: response
                  }]);
                } else {
                  mockedXHR.rejectWith(context, [{
                    responseText: response
                  }, status, httpMessage]);
                }
              };

              module.debug('Using specified async response callback', asyncResponder);
              asyncResponder.call(context, requestSettings, asyncCallback);
            }

            return mockedXHR;
          },
          xhr: function xhr() {
            var xhr; // ajax request promise

            xhr = $.ajax(ajaxSettings).always(module.event.xhr.always).done(module.event.xhr.done).fail(module.event.xhr.fail);
            module.verbose('Created server request', xhr, ajaxSettings);
            return xhr;
          }
        },
        set: {
          error: function error() {
            module.verbose('Adding error state to element', $context);
            $context.addClass(className.error);
          },
          loading: function loading() {
            module.verbose('Adding loading state to element', $context);
            $context.addClass(className.loading);
            requestStartTime = new Date().getTime();
          }
        },
        remove: {
          error: function error() {
            module.verbose('Removing error state from element', $context);
            $context.removeClass(className.error);
          },
          loading: function loading() {
            module.verbose('Removing loading state from element', $context);
            $context.removeClass(className.loading);
          }
        },
        get: {
          responseFromXHR: function responseFromXHR(xhr) {
            return $.isPlainObject(xhr) ? module.is.expectingJSON() ? module.decode.json(xhr.responseText) : xhr.responseText : false;
          },
          errorFromRequest: function errorFromRequest(response, status, httpMessage) {
            return $.isPlainObject(response) && response.error !== undefined ? response.error // use json error message
            : _settings5.error[status] !== undefined ? // use server error message
            _settings5.error[status] : httpMessage;
          },
          request: function request() {
            return module.request || false;
          },
          xhr: function xhr() {
            return module.xhr || false;
          },
          settings: function settings() {
            var runSettings;
            runSettings = _settings5.beforeSend.call(context, _settings5);

            if (runSettings) {
              if (runSettings.success !== undefined) {
                module.debug('Legacy success callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.success);
                runSettings.onSuccess = runSettings.success;
              }

              if (runSettings.failure !== undefined) {
                module.debug('Legacy failure callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.failure);
                runSettings.onFailure = runSettings.failure;
              }

              if (runSettings.complete !== undefined) {
                module.debug('Legacy complete callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.complete);
                runSettings.onComplete = runSettings.complete;
              }
            }

            if (runSettings === undefined) {
              module.error(error.noReturnedValue);
            }

            if (runSettings === false) {
              return runSettings;
            }

            return runSettings !== undefined ? $.extend(true, {}, runSettings) : $.extend(true, {}, _settings5);
          },
          urlEncodedValue: function urlEncodedValue(value) {
            var decodedValue = window.decodeURIComponent(value),
                encodedValue = window.encodeURIComponent(value),
                alreadyEncoded = decodedValue !== value;

            if (alreadyEncoded) {
              module.debug('URL value is already encoded, avoiding double encoding', value);
              return value;
            }

            module.verbose('Encoding value using encodeURIComponent', value, encodedValue);
            return encodedValue;
          },
          defaultData: function defaultData() {
            var data = {};

            if (!$.isWindow(element)) {
              if (module.is.input()) {
                data.value = $module.val();
              } else if (module.is.form()) {} else {
                data.text = $module.text();
              }
            }

            return data;
          },
          event: function event() {
            if ($.isWindow(element) || _settings5.on == 'now') {
              module.debug('API called without element, no events attached');
              return false;
            } else if (_settings5.on == 'auto') {
              if ($module.is('input')) {
                return element.oninput !== undefined ? 'input' : element.onpropertychange !== undefined ? 'propertychange' : 'keyup';
              } else if ($module.is('form')) {
                return 'submit';
              } else {
                return 'click';
              }
            } else {
              return _settings5.on;
            }
          },
          templatedURL: function templatedURL(action) {
            action = action || $module.data(metadata.action) || _settings5.action || false;
            url = $module.data(metadata.url) || _settings5.url || false;

            if (url) {
              module.debug('Using specified url', url);
              return url;
            }

            if (action) {
              module.debug('Looking up url for action', action, _settings5.api);

              if (_settings5.api[action] === undefined && !module.is.mocked()) {
                module.error(error.missingAction, _settings5.action, _settings5.api);
                return;
              }

              url = _settings5.api[action];
            } else if (module.is.form()) {
              url = $module.attr('action') || $context.attr('action') || false;
              module.debug('No url or action specified, defaulting to form action', url);
            }

            return url;
          }
        },
        abort: function abort() {
          var xhr = module.get.xhr();

          if (xhr && xhr.state() !== 'resolved') {
            module.debug('Cancelling API request');
            xhr.abort();
          }
        },
        // reset state
        reset: function reset() {
          module.remove.error();
          module.remove.loading();
        },
        setting: function setting(name, value) {
          module.debug('Changing setting', name, value);

          if ($.isPlainObject(name)) {
            $.extend(true, _settings5, name);
          } else if (value !== undefined) {
            if ($.isPlainObject(_settings5[name])) {
              $.extend(true, _settings5[name], value);
            } else {
              _settings5[name] = value;
            }
          } else {
            return _settings5[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!_settings5.silent && _settings5.debug) {
            if (_settings5.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, _settings5.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!_settings5.silent && _settings5.verbose && _settings5.debug) {
            if (_settings5.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, _settings5.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!_settings5.silent) {
            module.error = Function.prototype.bind.call(console.error, console, _settings5.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (_settings5.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                //'Element'        : element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = _settings5.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                module.error(error.method, query);
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.api.settings = {
    name: 'API',
    namespace: 'api',
    debug: false,
    verbose: false,
    performance: true,
    // object containing all templates endpoints
    api: {},
    // whether to cache responses
    cache: true,
    // whether new requests should abort previous requests
    interruptRequests: true,
    // event binding
    on: 'auto',
    // context for applying state classes
    stateContext: false,
    // duration for loading state
    loadingDuration: 0,
    // whether to hide errors after a period of time
    hideError: 'auto',
    // duration for error state
    errorDuration: 2000,
    // whether parameters should be encoded with encodeURIComponent
    encodeParameters: true,
    // API action to use
    action: false,
    // templated URL to use
    url: false,
    // base URL to apply to all endpoints
    base: '',
    // data that will
    urlData: {},
    // whether to add default data to url data
    defaultData: true,
    // whether to serialize closest form
    serializeForm: false,
    // how long to wait before request should occur
    throttle: 0,
    // whether to throttle first request or only repeated
    throttleFirstRequest: true,
    // standard ajax settings
    method: 'get',
    data: {},
    dataType: 'json',
    // mock response
    mockResponse: false,
    mockResponseAsync: false,
    // aliases for mock
    response: false,
    responseAsync: false,
    // callbacks before request
    beforeSend: function beforeSend(settings) {
      return settings;
    },
    beforeXHR: function beforeXHR(xhr) {},
    onRequest: function onRequest(promise, xhr) {},
    // after request
    onResponse: false,
    // function(response) { },
    // response was successful, if JSON passed validation
    onSuccess: function onSuccess(response, $module) {},
    // request finished without aborting
    onComplete: function onComplete(response, $module) {},
    // failed JSON success test
    onFailure: function onFailure(response, $module) {},
    // server error
    onError: function onError(errorMessage, $module) {},
    // request aborted
    onAbort: function onAbort(errorMessage, $module) {},
    successTest: false,
    // errors
    error: {
      beforeSend: 'The before send function has aborted the request',
      error: 'There was an error with your request',
      exitConditions: 'API Request Aborted. Exit conditions met',
      JSONParse: 'JSON could not be parsed during error handling',
      legacyParameters: 'You are using legacy API success callback names',
      method: 'The method you called is not defined',
      missingAction: 'API action used but no url was defined',
      missingSerialize: 'jquery-serialize-object is required to add form data to an existing data object',
      missingURL: 'No URL specified for api event',
      noReturnedValue: 'The beforeSend callback must return a settings object, beforeSend ignored.',
      noStorage: 'Caching responses locally requires session storage',
      parseError: 'There was an error parsing your request',
      requiredParameter: 'Missing a required URL parameter: ',
      statusMessage: 'Server gave an error: ',
      timeout: 'Your request timed out'
    },
    regExp: {
      required: /\{\$*[A-z0-9]+\}/g,
      optional: /\{\/\$*[A-z0-9]+\}/g
    },
    className: {
      loading: 'loading',
      error: 'error'
    },
    selector: {
      disabled: '.disabled',
      form: 'form'
    },
    metadata: {
      action: 'action',
      url: 'url'
    }
  };
})(jQuery, window, document);
/*!
 * # Semantic UI 2.4.2 - Visibility
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */


;

(function ($, window, document, undefined) {
  'use strict';

  window = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

  $.fn.visibility = function (parameters) {
    var $allModules = $(this),
        moduleSelector = $allModules.selector || '',
        time = new Date().getTime(),
        performance = [],
        query = arguments[0],
        methodInvoked = typeof query == 'string',
        queryArguments = [].slice.call(arguments, 1),
        returnedValue,
        moduleCount = $allModules.length,
        loadedCount = 0;
    $allModules.each(function () {
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.visibility.settings, parameters) : $.extend({}, $.fn.visibility.settings),
          className = settings.className,
          namespace = settings.namespace,
          error = settings.error,
          metadata = settings.metadata,
          eventNamespace = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          $window = $(window),
          $module = $(this),
          $context = $(settings.context),
          $placeholder,
          selector = $module.selector || '',
          instance = $module.data(moduleNamespace),
          requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        setTimeout(callback, 0);
      },
          element = this,
          disabled = false,
          contextObserver,
          observer,
          module;

      module = {
        initialize: function initialize() {
          module.debug('Initializing', settings);
          module.setup.cache();

          if (module.should.trackChanges()) {
            if (settings.type == 'image') {
              module.setup.image();
            }

            if (settings.type == 'fixed') {
              module.setup.fixed();
            }

            if (settings.observeChanges) {
              module.observeChanges();
            }

            module.bind.events();
          }

          module.save.position();

          if (!module.is.visible()) {
            module.error(error.visible, $module);
          }

          if (settings.initialCheck) {
            module.checkVisibility();
          }

          module.instantiate();
        },
        instantiate: function instantiate() {
          module.debug('Storing instance', module);
          $module.data(moduleNamespace, module);
          instance = module;
        },
        destroy: function destroy() {
          module.verbose('Destroying previous module');

          if (observer) {
            observer.disconnect();
          }

          if (contextObserver) {
            contextObserver.disconnect();
          }

          $window.off('load' + eventNamespace, module.event.load).off('resize' + eventNamespace, module.event.resize);
          $context.off('scroll' + eventNamespace, module.event.scroll).off('scrollchange' + eventNamespace, module.event.scrollchange);

          if (settings.type == 'fixed') {
            module.resetFixed();
            module.remove.placeholder();
          }

          $module.off(eventNamespace).removeData(moduleNamespace);
        },
        observeChanges: function observeChanges() {
          if ('MutationObserver' in window) {
            contextObserver = new MutationObserver(module.event.contextChanged);
            observer = new MutationObserver(module.event.changed);
            contextObserver.observe(document, {
              childList: true,
              subtree: true
            });
            observer.observe(element, {
              childList: true,
              subtree: true
            });
            module.debug('Setting up mutation observer', observer);
          }
        },
        bind: {
          events: function events() {
            module.verbose('Binding visibility events to scroll and resize');

            if (settings.refreshOnLoad) {
              $window.on('load' + eventNamespace, module.event.load);
            }

            $window.on('resize' + eventNamespace, module.event.resize); // pub/sub pattern

            $context.off('scroll' + eventNamespace).on('scroll' + eventNamespace, module.event.scroll).on('scrollchange' + eventNamespace, module.event.scrollchange);
          }
        },
        event: {
          changed: function changed(mutations) {
            module.verbose('DOM tree modified, updating visibility calculations');
            module.timer = setTimeout(function () {
              module.verbose('DOM tree modified, updating sticky menu');
              module.refresh();
            }, 100);
          },
          contextChanged: function contextChanged(mutations) {
            [].forEach.call(mutations, function (mutation) {
              if (mutation.removedNodes) {
                [].forEach.call(mutation.removedNodes, function (node) {
                  if (node == element || $(node).find(element).length > 0) {
                    module.debug('Element removed from DOM, tearing down events');
                    module.destroy();
                  }
                });
              }
            });
          },
          resize: function resize() {
            module.debug('Window resized');

            if (settings.refreshOnResize) {
              requestAnimationFrame(module.refresh);
            }
          },
          load: function load() {
            module.debug('Page finished loading');
            requestAnimationFrame(module.refresh);
          },
          // publishes scrollchange event on one scroll
          scroll: function scroll() {
            if (settings.throttle) {
              clearTimeout(module.timer);
              module.timer = setTimeout(function () {
                $context.triggerHandler('scrollchange' + eventNamespace, [$context.scrollTop()]);
              }, settings.throttle);
            } else {
              requestAnimationFrame(function () {
                $context.triggerHandler('scrollchange' + eventNamespace, [$context.scrollTop()]);
              });
            }
          },
          // subscribes to scrollchange
          scrollchange: function scrollchange(event, scrollPosition) {
            module.checkVisibility(scrollPosition);
          }
        },
        precache: function precache(images, callback) {
          if (!(images instanceof Array)) {
            images = [images];
          }

          var imagesLength = images.length,
              loadedCounter = 0,
              cache = [],
              cacheImage = document.createElement('img'),
              handleLoad = function handleLoad() {
            loadedCounter++;

            if (loadedCounter >= images.length) {
              if ($.isFunction(callback)) {
                callback();
              }
            }
          };

          while (imagesLength--) {
            cacheImage = document.createElement('img');
            cacheImage.onload = handleLoad;
            cacheImage.onerror = handleLoad;
            cacheImage.src = images[imagesLength];
            cache.push(cacheImage);
          }
        },
        enableCallbacks: function enableCallbacks() {
          module.debug('Allowing callbacks to occur');
          disabled = false;
        },
        disableCallbacks: function disableCallbacks() {
          module.debug('Disabling all callbacks temporarily');
          disabled = true;
        },
        should: {
          trackChanges: function trackChanges() {
            if (methodInvoked) {
              module.debug('One time query, no need to bind events');
              return false;
            }

            module.debug('Callbacks being attached');
            return true;
          }
        },
        setup: {
          cache: function cache() {
            module.cache = {
              occurred: {},
              screen: {},
              element: {}
            };
          },
          image: function image() {
            var src = $module.data(metadata.src);

            if (src) {
              module.verbose('Lazy loading image', src);
              settings.once = true;
              settings.observeChanges = false; // show when top visible

              settings.onOnScreen = function () {
                module.debug('Image on screen', element);
                module.precache(src, function () {
                  module.set.image(src, function () {
                    loadedCount++;

                    if (loadedCount == moduleCount) {
                      settings.onAllLoaded.call(this);
                    }

                    settings.onLoad.call(this);
                  });
                });
              };
            }
          },
          fixed: function fixed() {
            module.debug('Setting up fixed');
            settings.once = false;
            settings.observeChanges = false;
            settings.initialCheck = true;
            settings.refreshOnLoad = true;

            if (!parameters.transition) {
              settings.transition = false;
            }

            module.create.placeholder();
            module.debug('Added placeholder', $placeholder);

            settings.onTopPassed = function () {
              module.debug('Element passed, adding fixed position', $module);
              module.show.placeholder();
              module.set.fixed();

              if (settings.transition) {
                if ($.fn.transition !== undefined) {
                  $module.transition(settings.transition, settings.duration);
                }
              }
            };

            settings.onTopPassedReverse = function () {
              module.debug('Element returned to position, removing fixed', $module);
              module.hide.placeholder();
              module.remove.fixed();
            };
          }
        },
        create: {
          placeholder: function placeholder() {
            module.verbose('Creating fixed position placeholder');
            $placeholder = $module.clone(false).css('display', 'none').addClass(className.placeholder).insertAfter($module);
          }
        },
        show: {
          placeholder: function placeholder() {
            module.verbose('Showing placeholder');
            $placeholder.css('display', 'block').css('visibility', 'hidden');
          }
        },
        hide: {
          placeholder: function placeholder() {
            module.verbose('Hiding placeholder');
            $placeholder.css('display', 'none').css('visibility', '');
          }
        },
        set: {
          fixed: function fixed() {
            module.verbose('Setting element to fixed position');
            $module.addClass(className.fixed).css({
              position: 'fixed',
              top: settings.offset + 'px',
              left: 'auto',
              zIndex: settings.zIndex
            });
            settings.onFixed.call(element);
          },
          image: function image(src, callback) {
            $module.attr('src', src);

            if (settings.transition) {
              if ($.fn.transition !== undefined) {
                if ($module.hasClass(className.visible)) {
                  module.debug('Transition already occurred on this image, skipping animation');
                  return;
                }

                $module.transition(settings.transition, settings.duration, callback);
              } else {
                $module.fadeIn(settings.duration, callback);
              }
            } else {
              $module.show();
            }
          }
        },
        is: {
          onScreen: function onScreen() {
            var calculations = module.get.elementCalculations();
            return calculations.onScreen;
          },
          offScreen: function offScreen() {
            var calculations = module.get.elementCalculations();
            return calculations.offScreen;
          },
          visible: function visible() {
            if (module.cache && module.cache.element) {
              return !(module.cache.element.width === 0 && module.cache.element.offset.top === 0);
            }

            return false;
          },
          verticallyScrollableContext: function verticallyScrollableContext() {
            var overflowY = $context.get(0) !== window ? $context.css('overflow-y') : false;
            return overflowY == 'auto' || overflowY == 'scroll';
          },
          horizontallyScrollableContext: function horizontallyScrollableContext() {
            var overflowX = $context.get(0) !== window ? $context.css('overflow-x') : false;
            return overflowX == 'auto' || overflowX == 'scroll';
          }
        },
        refresh: function refresh() {
          module.debug('Refreshing constants (width/height)');

          if (settings.type == 'fixed') {
            module.resetFixed();
          }

          module.reset();
          module.save.position();

          if (settings.checkOnRefresh) {
            module.checkVisibility();
          }

          settings.onRefresh.call(element);
        },
        resetFixed: function resetFixed() {
          module.remove.fixed();
          module.remove.occurred();
        },
        reset: function reset() {
          module.verbose('Resetting all cached values');

          if ($.isPlainObject(module.cache)) {
            module.cache.screen = {};
            module.cache.element = {};
          }
        },
        checkVisibility: function checkVisibility(scroll) {
          module.verbose('Checking visibility of element', module.cache.element);

          if (!disabled && module.is.visible()) {
            // save scroll position
            module.save.scroll(scroll); // update calculations derived from scroll

            module.save.calculations(); // percentage

            module.passed(); // reverse (must be first)

            module.passingReverse();
            module.topVisibleReverse();
            module.bottomVisibleReverse();
            module.topPassedReverse();
            module.bottomPassedReverse(); // one time

            module.onScreen();
            module.offScreen();
            module.passing();
            module.topVisible();
            module.bottomVisible();
            module.topPassed();
            module.bottomPassed(); // on update callback

            if (settings.onUpdate) {
              settings.onUpdate.call(element, module.get.elementCalculations());
            }
          }
        },
        passed: function passed(amount, newCallback) {
          var calculations = module.get.elementCalculations(),
              amountInPixels; // assign callback

          if (amount && newCallback) {
            settings.onPassed[amount] = newCallback;
          } else if (amount !== undefined) {
            return module.get.pixelsPassed(amount) > calculations.pixelsPassed;
          } else if (calculations.passing) {
            $.each(settings.onPassed, function (amount, callback) {
              if (calculations.bottomVisible || calculations.pixelsPassed > module.get.pixelsPassed(amount)) {
                module.execute(callback, amount);
              } else if (!settings.once) {
                module.remove.occurred(callback);
              }
            });
          }
        },
        onScreen: function onScreen(newCallback) {
          var calculations = module.get.elementCalculations(),
              callback = newCallback || settings.onOnScreen,
              callbackName = 'onScreen';

          if (newCallback) {
            module.debug('Adding callback for onScreen', newCallback);
            settings.onOnScreen = newCallback;
          }

          if (calculations.onScreen) {
            module.execute(callback, callbackName);
          } else if (!settings.once) {
            module.remove.occurred(callbackName);
          }

          if (newCallback !== undefined) {
            return calculations.onOnScreen;
          }
        },
        offScreen: function offScreen(newCallback) {
          var calculations = module.get.elementCalculations(),
              callback = newCallback || settings.onOffScreen,
              callbackName = 'offScreen';

          if (newCallback) {
            module.debug('Adding callback for offScreen', newCallback);
            settings.onOffScreen = newCallback;
          }

          if (calculations.offScreen) {
            module.execute(callback, callbackName);
          } else if (!settings.once) {
            module.remove.occurred(callbackName);
          }

          if (newCallback !== undefined) {
            return calculations.onOffScreen;
          }
        },
        passing: function passing(newCallback) {
          var calculations = module.get.elementCalculations(),
              callback = newCallback || settings.onPassing,
              callbackName = 'passing';

          if (newCallback) {
            module.debug('Adding callback for passing', newCallback);
            settings.onPassing = newCallback;
          }

          if (calculations.passing) {
            module.execute(callback, callbackName);
          } else if (!settings.once) {
            module.remove.occurred(callbackName);
          }

          if (newCallback !== undefined) {
            return calculations.passing;
          }
        },
        topVisible: function topVisible(newCallback) {
          var calculations = module.get.elementCalculations(),
              callback = newCallback || settings.onTopVisible,
              callbackName = 'topVisible';

          if (newCallback) {
            module.debug('Adding callback for top visible', newCallback);
            settings.onTopVisible = newCallback;
          }

          if (calculations.topVisible) {
            module.execute(callback, callbackName);
          } else if (!settings.once) {
            module.remove.occurred(callbackName);
          }

          if (newCallback === undefined) {
            return calculations.topVisible;
          }
        },
        bottomVisible: function bottomVisible(newCallback) {
          var calculations = module.get.elementCalculations(),
              callback = newCallback || settings.onBottomVisible,
              callbackName = 'bottomVisible';

          if (newCallback) {
            module.debug('Adding callback for bottom visible', newCallback);
            settings.onBottomVisible = newCallback;
          }

          if (calculations.bottomVisible) {
            module.execute(callback, callbackName);
          } else if (!settings.once) {
            module.remove.occurred(callbackName);
          }

          if (newCallback === undefined) {
            return calculations.bottomVisible;
          }
        },
        topPassed: function topPassed(newCallback) {
          var calculations = module.get.elementCalculations(),
              callback = newCallback || settings.onTopPassed,
              callbackName = 'topPassed';

          if (newCallback) {
            module.debug('Adding callback for top passed', newCallback);
            settings.onTopPassed = newCallback;
          }

          if (calculations.topPassed) {
            module.execute(callback, callbackName);
          } else if (!settings.once) {
            module.remove.occurred(callbackName);
          }

          if (newCallback === undefined) {
            return calculations.topPassed;
          }
        },
        bottomPassed: function bottomPassed(newCallback) {
          var calculations = module.get.elementCalculations(),
              callback = newCallback || settings.onBottomPassed,
              callbackName = 'bottomPassed';

          if (newCallback) {
            module.debug('Adding callback for bottom passed', newCallback);
            settings.onBottomPassed = newCallback;
          }

          if (calculations.bottomPassed) {
            module.execute(callback, callbackName);
          } else if (!settings.once) {
            module.remove.occurred(callbackName);
          }

          if (newCallback === undefined) {
            return calculations.bottomPassed;
          }
        },
        passingReverse: function passingReverse(newCallback) {
          var calculations = module.get.elementCalculations(),
              callback = newCallback || settings.onPassingReverse,
              callbackName = 'passingReverse';

          if (newCallback) {
            module.debug('Adding callback for passing reverse', newCallback);
            settings.onPassingReverse = newCallback;
          }

          if (!calculations.passing) {
            if (module.get.occurred('passing')) {
              module.execute(callback, callbackName);
            }
          } else if (!settings.once) {
            module.remove.occurred(callbackName);
          }

          if (newCallback !== undefined) {
            return !calculations.passing;
          }
        },
        topVisibleReverse: function topVisibleReverse(newCallback) {
          var calculations = module.get.elementCalculations(),
              callback = newCallback || settings.onTopVisibleReverse,
              callbackName = 'topVisibleReverse';

          if (newCallback) {
            module.debug('Adding callback for top visible reverse', newCallback);
            settings.onTopVisibleReverse = newCallback;
          }

          if (!calculations.topVisible) {
            if (module.get.occurred('topVisible')) {
              module.execute(callback, callbackName);
            }
          } else if (!settings.once) {
            module.remove.occurred(callbackName);
          }

          if (newCallback === undefined) {
            return !calculations.topVisible;
          }
        },
        bottomVisibleReverse: function bottomVisibleReverse(newCallback) {
          var calculations = module.get.elementCalculations(),
              callback = newCallback || settings.onBottomVisibleReverse,
              callbackName = 'bottomVisibleReverse';

          if (newCallback) {
            module.debug('Adding callback for bottom visible reverse', newCallback);
            settings.onBottomVisibleReverse = newCallback;
          }

          if (!calculations.bottomVisible) {
            if (module.get.occurred('bottomVisible')) {
              module.execute(callback, callbackName);
            }
          } else if (!settings.once) {
            module.remove.occurred(callbackName);
          }

          if (newCallback === undefined) {
            return !calculations.bottomVisible;
          }
        },
        topPassedReverse: function topPassedReverse(newCallback) {
          var calculations = module.get.elementCalculations(),
              callback = newCallback || settings.onTopPassedReverse,
              callbackName = 'topPassedReverse';

          if (newCallback) {
            module.debug('Adding callback for top passed reverse', newCallback);
            settings.onTopPassedReverse = newCallback;
          }

          if (!calculations.topPassed) {
            if (module.get.occurred('topPassed')) {
              module.execute(callback, callbackName);
            }
          } else if (!settings.once) {
            module.remove.occurred(callbackName);
          }

          if (newCallback === undefined) {
            return !calculations.onTopPassed;
          }
        },
        bottomPassedReverse: function bottomPassedReverse(newCallback) {
          var calculations = module.get.elementCalculations(),
              callback = newCallback || settings.onBottomPassedReverse,
              callbackName = 'bottomPassedReverse';

          if (newCallback) {
            module.debug('Adding callback for bottom passed reverse', newCallback);
            settings.onBottomPassedReverse = newCallback;
          }

          if (!calculations.bottomPassed) {
            if (module.get.occurred('bottomPassed')) {
              module.execute(callback, callbackName);
            }
          } else if (!settings.once) {
            module.remove.occurred(callbackName);
          }

          if (newCallback === undefined) {
            return !calculations.bottomPassed;
          }
        },
        execute: function execute(callback, callbackName) {
          var calculations = module.get.elementCalculations(),
              screen = module.get.screenCalculations();
          callback = callback || false;

          if (callback) {
            if (settings.continuous) {
              module.debug('Callback being called continuously', callbackName, calculations);
              callback.call(element, calculations, screen);
            } else if (!module.get.occurred(callbackName)) {
              module.debug('Conditions met', callbackName, calculations);
              callback.call(element, calculations, screen);
            }
          }

          module.save.occurred(callbackName);
        },
        remove: {
          fixed: function fixed() {
            module.debug('Removing fixed position');
            $module.removeClass(className.fixed).css({
              position: '',
              top: '',
              left: '',
              zIndex: ''
            });
            settings.onUnfixed.call(element);
          },
          placeholder: function placeholder() {
            module.debug('Removing placeholder content');

            if ($placeholder) {
              $placeholder.remove();
            }
          },
          occurred: function occurred(callback) {
            if (callback) {
              var occurred = module.cache.occurred;

              if (occurred[callback] !== undefined && occurred[callback] === true) {
                module.debug('Callback can now be called again', callback);
                module.cache.occurred[callback] = false;
              }
            } else {
              module.cache.occurred = {};
            }
          }
        },
        save: {
          calculations: function calculations() {
            module.verbose('Saving all calculations necessary to determine positioning');
            module.save.direction();
            module.save.screenCalculations();
            module.save.elementCalculations();
          },
          occurred: function occurred(callback) {
            if (callback) {
              if (module.cache.occurred[callback] === undefined || module.cache.occurred[callback] !== true) {
                module.verbose('Saving callback occurred', callback);
                module.cache.occurred[callback] = true;
              }
            }
          },
          scroll: function scroll(scrollPosition) {
            scrollPosition = scrollPosition + settings.offset || $context.scrollTop() + settings.offset;
            module.cache.scroll = scrollPosition;
          },
          direction: function direction() {
            var scroll = module.get.scroll(),
                lastScroll = module.get.lastScroll(),
                direction;

            if (scroll > lastScroll && lastScroll) {
              direction = 'down';
            } else if (scroll < lastScroll && lastScroll) {
              direction = 'up';
            } else {
              direction = 'static';
            }

            module.cache.direction = direction;
            return module.cache.direction;
          },
          elementPosition: function elementPosition() {
            var element = module.cache.element,
                screen = module.get.screenSize();
            module.verbose('Saving element position'); // (quicker than $.extend)

            element.fits = element.height < screen.height;
            element.offset = $module.offset();
            element.width = $module.outerWidth();
            element.height = $module.outerHeight(); // compensate for scroll in context

            if (module.is.verticallyScrollableContext()) {
              element.offset.top += $context.scrollTop() - $context.offset().top;
            }

            if (module.is.horizontallyScrollableContext()) {
              element.offset.left += $context.scrollLeft - $context.offset().left;
            } // store


            module.cache.element = element;
            return element;
          },
          elementCalculations: function elementCalculations() {
            var screen = module.get.screenCalculations(),
                element = module.get.elementPosition(); // offset

            if (settings.includeMargin) {
              element.margin = {};
              element.margin.top = parseInt($module.css('margin-top'), 10);
              element.margin.bottom = parseInt($module.css('margin-bottom'), 10);
              element.top = element.offset.top - element.margin.top;
              element.bottom = element.offset.top + element.height + element.margin.bottom;
            } else {
              element.top = element.offset.top;
              element.bottom = element.offset.top + element.height;
            } // visibility


            element.topPassed = screen.top >= element.top;
            element.bottomPassed = screen.top >= element.bottom;
            element.topVisible = screen.bottom >= element.top && !element.topPassed;
            element.bottomVisible = screen.bottom >= element.bottom && !element.bottomPassed;
            element.pixelsPassed = 0;
            element.percentagePassed = 0; // meta calculations

            element.onScreen = (element.topVisible || element.passing) && !element.bottomPassed;
            element.passing = element.topPassed && !element.bottomPassed;
            element.offScreen = !element.onScreen; // passing calculations

            if (element.passing) {
              element.pixelsPassed = screen.top - element.top;
              element.percentagePassed = (screen.top - element.top) / element.height;
            }

            module.cache.element = element;
            module.verbose('Updated element calculations', element);
            return element;
          },
          screenCalculations: function screenCalculations() {
            var scroll = module.get.scroll();
            module.save.direction();
            module.cache.screen.top = scroll;
            module.cache.screen.bottom = scroll + module.cache.screen.height;
            return module.cache.screen;
          },
          screenSize: function screenSize() {
            module.verbose('Saving window position');
            module.cache.screen = {
              height: $context.height()
            };
          },
          position: function position() {
            module.save.screenSize();
            module.save.elementPosition();
          }
        },
        get: {
          pixelsPassed: function pixelsPassed(amount) {
            var element = module.get.elementCalculations();

            if (amount.search('%') > -1) {
              return element.height * (parseInt(amount, 10) / 100);
            }

            return parseInt(amount, 10);
          },
          occurred: function occurred(callback) {
            return module.cache.occurred !== undefined ? module.cache.occurred[callback] || false : false;
          },
          direction: function direction() {
            if (module.cache.direction === undefined) {
              module.save.direction();
            }

            return module.cache.direction;
          },
          elementPosition: function elementPosition() {
            if (module.cache.element === undefined) {
              module.save.elementPosition();
            }

            return module.cache.element;
          },
          elementCalculations: function elementCalculations() {
            if (module.cache.element === undefined) {
              module.save.elementCalculations();
            }

            return module.cache.element;
          },
          screenCalculations: function screenCalculations() {
            if (module.cache.screen === undefined) {
              module.save.screenCalculations();
            }

            return module.cache.screen;
          },
          screenSize: function screenSize() {
            if (module.cache.screen === undefined) {
              module.save.screenSize();
            }

            return module.cache.screen;
          },
          scroll: function scroll() {
            if (module.cache.scroll === undefined) {
              module.save.scroll();
            }

            return module.cache.scroll;
          },
          lastScroll: function lastScroll() {
            if (module.cache.screen === undefined) {
              module.debug('First scroll event, no last scroll could be found');
              return false;
            }

            return module.cache.screen.top;
          }
        },
        setting: function setting(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, settings, name);
          } else if (value !== undefined) {
            settings[name] = value;
          } else {
            return settings[name];
          }
        },
        internal: function internal(name, value) {
          if ($.isPlainObject(name)) {
            $.extend(true, module, name);
          } else if (value !== undefined) {
            module[name] = value;
          } else {
            return module[name];
          }
        },
        debug: function debug() {
          if (!settings.silent && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);
            }
          }
        },
        verbose: function verbose() {
          if (!settings.silent && settings.verbose && settings.debug) {
            if (settings.performance) {
              module.performance.log(arguments);
            } else {
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);
            }
          }
        },
        error: function error() {
          if (!settings.silent) {
            module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
            module.error.apply(console, arguments);
          }
        },
        performance: {
          log: function log(message) {
            var currentTime, executionTime, previousTime;

            if (settings.performance) {
              currentTime = new Date().getTime();
              previousTime = time || currentTime;
              executionTime = currentTime - previousTime;
              time = currentTime;
              performance.push({
                'Name': message[0],
                'Arguments': [].slice.call(message, 1) || '',
                'Element': element,
                'Execution Time': executionTime
              });
            }

            clearTimeout(module.performance.timer);
            module.performance.timer = setTimeout(module.performance.display, 500);
          },
          display: function display() {
            var title = settings.name + ':',
                totalTime = 0;
            time = false;
            clearTimeout(module.performance.timer);
            $.each(performance, function (index, data) {
              totalTime += data['Execution Time'];
            });
            title += ' ' + totalTime + 'ms';

            if (moduleSelector) {
              title += ' \'' + moduleSelector + '\'';
            }

            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);

              if (console.table) {
                console.table(performance);
              } else {
                $.each(performance, function (index, data) {
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });
              }

              console.groupEnd();
            }

            performance = [];
          }
        },
        invoke: function invoke(query, passedArguments, context) {
          var object = instance,
              maxDepth,
              found,
              response;
          passedArguments = passedArguments || queryArguments;
          context = element || context;

          if (typeof query == 'string' && object !== undefined) {
            query = query.split(/[\. ]/);
            maxDepth = query.length - 1;
            $.each(query, function (depth, value) {
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;

              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];
              } else if (object[camelCaseValue] !== undefined) {
                found = object[camelCaseValue];
                return false;
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];
              } else if (object[value] !== undefined) {
                found = object[value];
                return false;
              } else {
                module.error(error.method, query);
                return false;
              }
            });
          }

          if ($.isFunction(found)) {
            response = found.apply(context, passedArguments);
          } else if (found !== undefined) {
            response = found;
          }

          if ($.isArray(returnedValue)) {
            returnedValue.push(response);
          } else if (returnedValue !== undefined) {
            returnedValue = [returnedValue, response];
          } else if (response !== undefined) {
            returnedValue = response;
          }

          return found;
        }
      };

      if (methodInvoked) {
        if (instance === undefined) {
          module.initialize();
        }

        instance.save.scroll();
        instance.save.calculations();
        module.invoke(query);
      } else {
        if (instance !== undefined) {
          instance.invoke('destroy');
        }

        module.initialize();
      }
    });
    return returnedValue !== undefined ? returnedValue : this;
  };

  $.fn.visibility.settings = {
    name: 'Visibility',
    namespace: 'visibility',
    debug: false,
    verbose: false,
    performance: true,
    // whether to use mutation observers to follow changes
    observeChanges: true,
    // check position immediately on init
    initialCheck: true,
    // whether to refresh calculations after all page images load
    refreshOnLoad: true,
    // whether to refresh calculations after page resize event
    refreshOnResize: true,
    // should call callbacks on refresh event (resize, etc)
    checkOnRefresh: true,
    // callback should only occur one time
    once: true,
    // callback should fire continuously whe evaluates to true
    continuous: false,
    // offset to use with scroll top
    offset: 0,
    // whether to include margin in elements position
    includeMargin: false,
    // scroll context for visibility checks
    context: window,
    // visibility check delay in ms (defaults to animationFrame)
    throttle: false,
    // special visibility type (image, fixed)
    type: false,
    // z-index to use with visibility 'fixed'
    zIndex: '10',
    // image only animation settings
    transition: 'fade in',
    duration: 1000,
    // array of callbacks for percentage
    onPassed: {},
    // standard callbacks
    onOnScreen: false,
    onOffScreen: false,
    onPassing: false,
    onTopVisible: false,
    onBottomVisible: false,
    onTopPassed: false,
    onBottomPassed: false,
    // reverse callbacks
    onPassingReverse: false,
    onTopVisibleReverse: false,
    onBottomVisibleReverse: false,
    onTopPassedReverse: false,
    onBottomPassedReverse: false,
    // special callbacks for image
    onLoad: function onLoad() {},
    onAllLoaded: function onAllLoaded() {},
    // special callbacks for fixed position
    onFixed: function onFixed() {},
    onUnfixed: function onUnfixed() {},
    // utility callbacks
    onUpdate: false,
    // disabled by default for performance
    onRefresh: function onRefresh() {},
    metadata: {
      src: 'src'
    },
    className: {
      fixed: 'fixed',
      placeholder: 'placeholder',
      visible: 'visible'
    },
    error: {
      method: 'The method you called is not defined.',
      visible: 'Element is hidden, you must call refresh after element becomes visible'
    }
  };
})(jQuery, window, document);
},{}],"../../../../../../.nvm/versions/node/v10.16.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "32991" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../.nvm/versions/node/v10.16.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","semantic/dist/semantic.js"], null)
//# sourceMappingURL=/semantic.5f8949d6.js.map