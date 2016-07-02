CREATE TABLE IF NOT EXISTS `map` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `owner` int(11) unsigned DEFAULT NULL,
  `url` longtext COLLATE utf8_unicode_ci,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1011 ;

CREATE TABLE IF NOT EXISTS `share` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `mapid` int(11) unsigned DEFAULT NULL,
  `owner` int(11) unsigned DEFAULT NULL,
  `borrower` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=65 ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=43 ;