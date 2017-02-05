package br.com.helpdesk.repository;

import br.com.helpdesk.domain.Cidade;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Cidade entity.
 */
@SuppressWarnings("unused")
public interface CidadeRepository extends JpaRepository<Cidade,Long> {

}
