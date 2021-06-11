package com.codesquad.issuetracker.milestone.domain;

import com.codesquad.issuetracker.milestone.dto.MilestoneRequestDto;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class Milestone {

    @Id
    @GeneratedValue( generator = "uuid2" )
    @GenericGenerator( name = "uuid2", strategy = "uuid2" )
    @Column( name = "MILESTONE_ID", columnDefinition = "BINARY(16)" )
    private UUID id;

    @NonNull
    @Column(name = "MILESTONE_TITLE", unique = true, nullable = false)
    private String title;

    @NonNull
    @Lob
    @Column(name = "DESCRIPTION", nullable = false)
    private String description;

    @Column(name = "DUE_DATE")
    private LocalDate dueDate;

    private Milestone(@NonNull String title, @NonNull String description, LocalDate dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
    }

    public static Milestone create(String title, String description, LocalDate dueDate) {
        return new Milestone(title, description, dueDate);
    }

    public void update(MilestoneRequestDto milestoneRequest) {
        this.title = milestoneRequest.getTitle();
        this.description = milestoneRequest.getDescription();
        this.dueDate = milestoneRequest.getDueDate();
    }
}
